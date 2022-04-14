import express from 'express';
import {
  getProducts,
  getProductsById,
} from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter.route('/').get(getProducts);
productsRouter.route('/:Id').get(getProductsById);

export default productsRouter;
