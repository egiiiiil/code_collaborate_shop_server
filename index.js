import express from 'express';
import 'dotenv/config';
import productsRouter from './src/routes/productsRoute.js';
import adminRouter from './src/routes/adminRoute.js';
import cartRouter from './src/routes/cartRoute.js';
import ordersRouter from './src/routes/ordersRoute.js';
import cors from 'cors';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.use(express.static('public/images'));

app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
	console.log(`Server at http://localhost:${PORT}`);
});
