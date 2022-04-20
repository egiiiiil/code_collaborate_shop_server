import express from 'express';
import 'dotenv/config';
import productsRouter from './src/routes/productsRoute.js';
import cors from 'cors';
const PORT = 8080;

const app = express();

app.use(express.static('public/images'));

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
