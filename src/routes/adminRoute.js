import express from 'express';
import {
  addUser,
  getAdmin,
  loginAdmin,
} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route('/').post(addUser);
adminRouter.route('/login').get(getAdmin).post(loginAdmin);

export default adminRouter;
