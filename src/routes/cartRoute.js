import express from 'express';
import {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  removeCart,
  getSpecificCart,
  deleteAllCarts,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

//GET
cartRouter.route('/').get(getCart);
cartRouter.route('/:id').get(getCart);

//POST
cartRouter.route('/').post(createCart);
cartRouter.route('/:id').post(addToCart);

//DELETE
cartRouter.route('/').delete(deleteAllCarts);
cartRouter.route('/:id').delete(removeCart);
cartRouter.route('/:id/:productId').delete(removeFromCart);

export default cartRouter;
