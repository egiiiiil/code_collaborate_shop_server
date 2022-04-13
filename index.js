import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';

const PORT = 8080;

const app = express();

const uri =
  'mongodb+srv://ij:bIkK3zoLag3hcX3R@<cluster-url>?retryWrites=true&writeConcern=majority';

const client = new MongoClient(uri);

app.use(express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server at http://127.0.0.1:${PORT}`);
});
