import express from 'express';
import 'dotenv/config';
import productsRouter from './src/routes/productsRoute.js';
import cartRouter from './src/routes/cartRoute.js';
import cors from 'cors';
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.static('public/images'));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
