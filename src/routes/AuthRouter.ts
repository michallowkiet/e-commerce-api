import { signUp, signIn, logout } from '../controllers/AuthController.js';
import { Router } from 'express';
import { AsyncErrorWrapper } from '../utils/index.js';

const AuthRouter = Router();

AuthRouter.route('/logout').get(AsyncErrorWrapper(logout));
AuthRouter.route('/signin').post(AsyncErrorWrapper(signIn));
AuthRouter.route('/signup').post(AsyncErrorWrapper(signUp));

export default AuthRouter;
