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

const removeFromCart = async (req, res) => {
	//res.send('Hello').status(200).end();
	const id = req.params.id;
	const selectedProduct = req.body;
	console.log(selectedProduct);
	const isInCart = await cartCollection.findOne({
		_id: new mongodb.ObjectId(id),
		'products._id': new mongodb.ObjectId(selectedProduct.productId),
	});
	console.log(isInCart);
	if (isInCart) {
		await cartCollection.updateOne(
			{
				_id: new mongodb.ObjectId(id),
				'products._id': new mongodb.ObjectId(selectedProduct.productId),
			},
			{ $inc: { 'products.$.qty': -1 } }
		);
	} else {
		res.sendStatus(204);
	}
	res.json({}).status(200).end();
};

//Remove all qty of product from cart
// const removeItemFromCart = async (req, res) => {
// 	//res.send('Hello').status(200).end();
// 	const id = req.params.id;
// 	const selectedProduct = req.params.productId;
// 	console.log('sp', selectedProduct);
// 	console.log('id', id);
// 	const isInCart = await cartCollection.findOne({
// 		_id: new mongodb.ObjectId(id),
// 		'products._id': new mongodb.ObjectId(selectedProduct),
// 	});
// 	console.log('inc', isInCart);
// 	// if (isInCart) {
// 	// 	await cartCollection.updateOne(
// 	// 		{
// 	// 			_id: new mongodb.ObjectId(id),
// 	// 			'products._id': new mongodb.ObjectId(selectedProduct),
// 	// 		},
// 	// 		{
// 	// 			$pull: { 'products.$._id': { isInCart.products } },
// 	// 		}
// 	// 	);
// 	// } else {
// 	// 	res.sendStatus(204);
// 	// }
// 	res.json({}).status(200).end();
// };

//Remove cart object by cart id
// const removeCart = async (req, res) => {
// 	const id = req.params.id;
// 	const selectedCartId = await cartCollection.count({
// 		_id: new mongodb.ObjectId(id),
// 	});
// 	const idExist = selectedCartId === 1;
// 	if (idExist) {
// 		await cartCollection.deleteOne({ _id: new mongodb.ObjectId(id) });
// 		res.sendStatus(200);
// 	} else {
// 		res.sendStatus(404);
// 	}
// };

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
	//removeItemFromCart,
	getSpecificCart,
	deleteAllCarts,
};
