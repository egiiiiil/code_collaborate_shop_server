import collections from '../database/MongoDB.js';
import mongodb from 'mongodb';

const cartCollection = collections.cart;
const productsCollection = collections.products;

const getCart = async (req, res) => {
	const cart = await cartCollection.find({}).toArray();
	res.json(cart);
};

const getSpecificCart = async (req, res) => {
	try {
		const id = req.params.id;
		const cart = await cartCollection.findOne({
			_id: new mongodb.ObjectId(id),
		});
		const ids = [];
		cart.products.forEach((item) => ids.push(item._id));
		const products = await productsCollection
			.find({ _id: { $in: ids } })
			.toArray();
		res.json({ products, cart });
	} catch (err) {
		console.log(err);
	}
};

const createCart = async (req, res) => {
	try {
		const selectedProduct = req.body;
		const cart = await cartCollection.insertOne({
			products: [{ _id: new mongodb.ObjectId(selectedProduct.id), qty: 1 }],
		});
		res.json({ cartId: cart.insertedId }).status(200).end();
	} catch (err) {
		console.log(err.message);
	}
};

const addToCart = async (req, res) => {
	//res.send('Hello').status(200).end();
	const id = req.params.id;
	const selectedProduct = req.body;

	const isInCart = await cartCollection.findOne({
		_id: new mongodb.ObjectId(id),
		'products._id': new mongodb.ObjectId(selectedProduct.id),
	});

	if (isInCart) {
		await cartCollection.updateOne(
			{
				_id: new mongodb.ObjectId(id),
				'products._id': new mongodb.ObjectId(selectedProduct.id),
			},
			{ $inc: { 'products.$.qty': 1 } }
		);
	} else {
		await cartCollection.updateOne(
			{ _id: new mongodb.ObjectId(id) },
			{
				$push: {
					products: {
						_id: new mongodb.ObjectId(selectedProduct.id),
						qty: 1,
					},
				},
			}
		);
	}
	res.json({}).status(200).end();
};

//Remove a single product from cart
const removeFromCart = async (req, res) => {
	const id = req.params.id;
	const selectedProduct = req.params.productId;
	await cartCollection.updateOne(
		{ _id: new mongodb.ObjectId(id) },
		{ $pull: { products: { productId: selectedProduct } } }
	);
	res.json({});
};

//Remove cart object by cart id
const removeCart = async (req, res) => {
	const id = req.params.id;
	const selectedCartId = await cartCollection.count({
		_id: new mongodb.ObjectId(id),
	});
	const idExist = selectedCartId === 1;
	if (idExist) {
		await cartCollection.deleteOne({ _id: new mongodb.ObjectId(id) });
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
};

//Delete all carts
const deleteAllCarts = async (req, res) => {
	try {
		await cartCollection.deleteMany({});
		res.sendStatus(200);
	} catch (error) {
		console.error(error.message);
	}
};

export {
	getCart,
	createCart,
	addToCart,
	removeFromCart,
	removeCart,
	getSpecificCart,
	deleteAllCarts,
};
