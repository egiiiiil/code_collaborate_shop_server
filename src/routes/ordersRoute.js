import express from 'express';
import {
	// getOrders,
	getOrdersProtected,
	postOrders,
} from '../controllers/ordersController.js';

const ordersRouter = express.Router();

// ordersRouter.route('/').get(getOrders);
ordersRouter.route('/admin').post(getOrdersProtected);
ordersRouter.route('/').post(postOrders);

export default ordersRouter;
