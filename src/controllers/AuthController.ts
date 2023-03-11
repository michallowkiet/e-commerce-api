import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import User from '../models/User.js';
import {
  ICreateUserRequest,
  ISignInUserRequest,
} from '../types/ICustomRequest.js';
import { IJWTPayload } from '../types/IJWTPayload.js';
import { addCookiesToResponse } from '../utils/index.js';

const signUp = async (
  req: ICreateUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const userPayload: IJWTPayload = {
    userId: user._id,
    name: user.name,
    role: user.role,
  };

  addCookiesToResponse(res, userPayload);

  res.status(StatusCodes.CREATED).json({ user: userPayload });
};

const signIn = async (req: ISignInUserRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email and Password must be provided');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('User does not exist.');
  }

  const isPasswordMatch = await user.comperePassword(password);

  if (!isPasswordMatch) {
    throw new UnauthenticatedError('Invalid credentials.');
  }

  const userPayload: IJWTPayload = {
    userId: user._id,
    name: user.name,
    role: user.role,
  };

  addCookiesToResponse(res, userPayload);

  res.status(StatusCodes.OK).json({ user: userPayload });
};

const logout = async (req: Request, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'Logout' });
};

export { signUp, signIn, logout };
