import express from 'express';
import mongodb from 'mongodb';
import 'dotenv/config';
import cors from 'cors';

// This is a test comment
// @desc yooooo
const PORT = 8080;

const app = express();

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@code-collaborate-shop.4vuoy.mongodb.net/test?retryWrites=true&writeConcern=majority`;
const client = new mongodb.MongoClient(uri);

// This is a test comment
// @desc yooooo
async function run() {
  try {
    await client.connect();

    const database = client.db('cnc-shop-db');
    const productsCollection = database.collection('products');

    const query = { type: 'wheels' };
    const skateboards = await productsCollection.find(query).toArray();
    console.log(skateboards);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.use(express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server at http://127.0.0.1:${PORT}`);
});
