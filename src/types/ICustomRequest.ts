import { Request } from 'express';
import IUser, { IChangePassword, ISignIn, IUpdateUser } from './IUser.js';
import { IJWTPayload } from './IJWTPayload.js';

export interface ICreateUserRequest extends Request {
  body: IUser;
}

export interface ISignInUserRequest extends Request {
  body: ISignIn;
}

export interface IAuthenticatedUserRequest extends Request {
  user: IJWTPayload;
}

export interface IChangePasswordRequest extends IAuthenticatedUserRequest {
  body: IChangePassword;
}

export interface IUpdateUserRequest extends IAuthenticatedUserRequest {
  body: IUpdateUser;
}
