import collections from '../database/MongoDB.js';
import { ObjectId } from 'mongodb';

const productsCollection = collections.products;

const getProducts = async (req, res) => {
	let filter = {};
	const query = req.query;
	if (query.category) {
		filter = { type: query.category };
	}
	try {
		const products = await productsCollection.find(filter).toArray();
		res.json({ products: products }).status(200).end();
	} catch (err) {
		console.log(err.message);
	}
};

const getProductsById = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await productsCollection.findOne({ _id: new ObjectId(id) });
		res.json(product).status(200).end();
	} catch (err) {
		res.status(404).end();
		console.log(err.message);
	}
};

export { getProducts, getProductsById };
