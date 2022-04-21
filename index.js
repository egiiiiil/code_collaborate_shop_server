import express from 'express';
import 'dotenv/config';
import productsRouter from './src/routes/productsRoute.js';
import adminRouter from './src/routes/adminRoute.js';
import cors from 'cors';
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.static('public/images'));

app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
