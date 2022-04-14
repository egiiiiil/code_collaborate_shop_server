import collections from '../database/MongoDB.js';
import { ObjectId } from 'mongodb';

const productsCollection = collections.products;
const getProducts = async (req, res) => {
  let filter = {};
  const query = req.query;
  console.log('query', query);

  if (query.category) {
    filter = { type: query.category };
  }

  if (query.search) {
    filter = { brand: { $regex: new RegExp(query.search, 'i') } };
  }
  try {
    const products = await productsCollection.find(filter).toArray();
    console.log(products);
    res.json(products).status(200).end();
  } catch (err) {
    console.log(err.message);
  }
};

const getProductsById = async (req, res) => {
  try {
    const Id = req.params.Id;
    const product = await productsCollection.findOne({ _id: new ObjectId(Id) });
    console.log(product);
    res.json(product).status(200).end();
  } catch (err) {
    console.log(err.message);
  }
};

export { getProducts, getProductsById };
