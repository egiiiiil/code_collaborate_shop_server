import express from 'express';
import { addUser } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route('/').post(addUser);

export default adminRouter;
