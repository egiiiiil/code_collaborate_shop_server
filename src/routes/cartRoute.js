import express from 'express';
import {
	getCart,
	createCart,
	addToCart,
	removeFromCart,
	getSpecificCart,
	deleteAllCarts,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

//GET
cartRouter.route('/').get(getCart).post(createCart).delete(deleteAllCarts);
cartRouter
	.route('/:id')
	.get(getSpecificCart)
	.post(addToCart)
	.delete(removeFromCart);

//POST
// cartRouter.route('/').post(createCart);
// cartRouter.route('/:id').post(addToCart);

//DELETE
// cartRouter.route('/').delete(deleteAllCarts);
// cartRouter.route('/:id').delete(removeFromCart);
cartRouter.route('/:id/:productId').delete(removeFromCart);

export default cartRouter;
