import mongodb from 'mongodb';
import 'dotenv/config';

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@code-collaborate-shop.4vuoy.mongodb.net/test?retryWrites=true&writeConcern=majority`;

const client = new mongodb.MongoClient(uri);
client.connect();

const database = client.db('cnc-shop-db');
const collections = {
  products: database.collection('products'),
  admin: database.collection('admin'),
  cart: database.collection('cart'),
  orders: database.collection('orders'),
};
client.close();

export default collections;
