import collections from '../database/MongoDB.js';
import { ObjectId } from 'mongodb';

const cartCollection = collections.cart;

const getCart = async (req, res) => {
  const cart = await cartCollection.find({}).toArray();
  res.json(cart);
};

const createCart = async (req, res) => {
  try {
    const selectedProduct = req.body;
    const cart = await cartCollection.insertOne(selectedProduct);
    res.json({ cartId: cart.insertedId }).status(200).end();
  } catch (err) {
    console.log(err.message);
  }
};

const addToCart = async (req, res) => {
  //res.send('Hello').status(200).end();
  const id = req.params.id;
  const selectedProduct = req.body;
  await cartCollection.updateOne(
    { _id: new mongodb.ObjectId(id) },
    { $push: { product: selectedProduct.product[0] } }
  );
  res.json({});
};

export { getCart, createCart, addToCart };
