import { Request } from 'express';
import IUser from './IUser.js';

export interface ICustomUserRequest extends Request {
  body: IUser;
}
