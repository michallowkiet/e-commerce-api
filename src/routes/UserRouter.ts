import { Router } from 'express';
import {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
} from '../controllers/UserController.js';
import AsyncErrorWrapper from '../utils/AsyncErrorWrapper.js';

const UserRouter = Router();

UserRouter.route('/').get(AsyncErrorWrapper(getAllUsers));
UserRouter.route('/showMe').get(AsyncErrorWrapper(getCurrentUser));
UserRouter.route('/updateUser').post(AsyncErrorWrapper(updateUser));
UserRouter.route('/updateUserPassword').post(AsyncErrorWrapper(updateUserPassword));
UserRouter.route('/:id').get(AsyncErrorWrapper(getSingleUser));

export default UserRouter;
