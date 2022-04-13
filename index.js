import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';

const PORT = 8080;

const app = express();

app.use(express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server at http://127.0.0.1:${PORT}`);
});
