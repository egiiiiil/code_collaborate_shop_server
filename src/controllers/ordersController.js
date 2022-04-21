import collections from '../database/MongoDB.js';
import mongodb from 'mongodb';

const ordersCollection = collections.orders;

const getOrders = async (req, res) => {
  res.status(200).end();
};
export { getOrders };
