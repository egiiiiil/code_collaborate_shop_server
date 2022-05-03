import collections from '../database/MongoDB.js';

const ordersCollection = collections.orders;
const secretToken = 'cncshopsecret';

// const getOrders = async (req, res) => {
// 	const orders = await ordersCollection.find({}).toArray();
// 	res.json(orders);
// };

const getOrdersProtected = async (req, res) => {
	const { token } = req.body;
	try {
		if (JSON.parse(token) === secretToken) {
			const orders = await ordersCollection.find({}).toArray();
			res.json(orders).status(200).end();
		} else {
			res.status(400).end();
		}
	} catch (err) {
		console.log(err);
	}
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

export { getOrdersProtected, postOrders };
