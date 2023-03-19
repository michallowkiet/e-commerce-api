import { Router } from 'express';
import {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
} from '../controllers/UserController.js';
import { authorizePermissions } from '../middleware/AuthenticationHandler.js';
import { UserRole } from '../types/IUser.js';
import AsyncErrorWrapper from '../utils/AsyncErrorWrapper.js';

const UserRouter = Router();

UserRouter.route('/').get(AsyncErrorWrapper(getAllUsers));
UserRouter.route('/showMe').get(AsyncErrorWrapper(getCurrentUser));
UserRouter.route('/updateUser').patch(AsyncErrorWrapper(updateUser));
UserRouter.route('/updateUserPassword').patch(AsyncErrorWrapper(updateUserPassword));
// UserRouter.route('/:id').get(
//   authorizePermissions(UserRole.ADMIN),
//   AsyncErrorWrapper(getSingleUser),
// );
UserRouter.route('/:id').get(AsyncErrorWrapper(getSingleUser));

export default UserRouter;
