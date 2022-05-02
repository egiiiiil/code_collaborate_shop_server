import collections from '../database/MongoDB.js';
import mongodb from 'mongodb';

const ordersCollection = collections.orders;

const getOrders = async (req, res) => {
	const orders = await ordersCollection.find({}).toArray();
	res.json(orders);
};

const postOrders = async (req, res) => {
	try {
		const { name, email, adress, city, cartId } = req.body;
		const order = await ordersCollection.insertOne({
			name: name,
			email: email,
			adress: adress,
			city: city,
			cartId: cartId,
		});
		res.json(order).status(200).end();
	} catch (err) {
		console.log(err.message);
	}
};

export { getOrders, postOrders };
