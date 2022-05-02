import express from 'express';
import { getOrders, postOrders } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.route('/').get(getOrders);
ordersRouter.route('/').post(postOrders);

export default ordersRouter;
