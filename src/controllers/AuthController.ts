import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { ICustomUserRequest } from '../types/ICustomRequest.js';
import { IJWTPayload } from '../types/IJWTPayload.js';
import { createToken } from '../utils/index.js';

const signUp = async (req: ICustomUserRequest, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const userPayload: IJWTPayload = { userId: user._id, name: user.name, role: user.role };
  const userToken = createToken(userPayload);

  res.status(StatusCodes.CREATED).json({ user: userPayload, token: userToken });
};

const signIn = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: 'Sign In' });
};

const logout = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: 'Logout' });
};

export { signUp, signIn, logout };
