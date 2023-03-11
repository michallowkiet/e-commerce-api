import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';
import User from '../models/User.js';
import { IAuthenticatedUserRequest } from '../types/ICustomRequest.js';
import { UserRole } from '../types/IUser.js';

const getAllUsers = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const users = await User.find({ role: UserRole.USER }).select(
    '-password -__v',
  );

  const numberOfUsers = await User.countDocuments({ role: UserRole.USER });

  res.status(StatusCodes.OK).json({ users: users, numberOfUsers });
};

const getSingleUser = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id: userID } = req.params;

  const user = await User.findById(userID).select('-password -__v');

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCodes.OK).json({ msg: 'getCurrentUser' });
};

const updateUser = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCodes.OK).json({ msg: 'getUpdateUser' });
};

const updateUserPassword = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCodes.OK).json({ msg: 'updateUserPassword' });
};

export {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
};
