import express from 'express';
import { getOrders } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.route('/').get(getOrders);

export default ordersRouter;
