import { Request } from 'express';
import IUser, { ISignIn } from './IUser.js';

export interface ICreateUserRequest extends Request {
  body: IUser;
}

export interface ISignInUserRequest extends Request {
  body: ISignIn;
}
