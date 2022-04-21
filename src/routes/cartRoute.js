import express from 'express';
import {
  getCart,
  createCart,
  addToCart,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.route('/').get(getCart);
cartRouter.route('/').post(createCart);
cartRouter.route('/:id').post(addToCart);

export default cartRouter;
