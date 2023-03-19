import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js';
import User from '../models/User.js';
import {
  IAuthenticatedUserRequest,
  IChangePasswordRequest,
  IUpdateUserRequest,
} from '../types/ICustomRequest.js';
import { IUserModel, UserRole } from '../types/IUser.js';
import createTokenUser from '../utils/createTokenUser.js';
import { addCookiesToResponse, checkPermissions } from '../utils/index.js';

const getAllUsers = async (req: IAuthenticatedUserRequest, res: Response, next: NextFunction) => {
  const users = await User.find({ role: UserRole.USER }).select('-password -__v');

  const numberOfUsers = await User.countDocuments({ role: UserRole.USER });

  res.status(StatusCodes.OK).json({ users: users, numberOfUsers });
};

const getSingleUser = async (req: IAuthenticatedUserRequest, res: Response, next: NextFunction) => {
  const { id: userID } = req.params;

  const user = await User.findById(userID).select('-password -__v');

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req: IUpdateUserRequest, res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError('Provide name and email.');
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  const userPayload = createTokenUser(user as IUserModel);
  addCookiesToResponse(res, userPayload);

  res.status(StatusCodes.OK).json({ user: userPayload });
};

// const updateUser = async (req: IUpdateUserRequest, res: Response, next: NextFunction) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     throw new BadRequestError('Provide name and email.');
//   }

//   const user = await User.findById({ _id: req.user.userId });

//   if (!user) {
//     throw new NotFoundError('User does not exist');
//   }

//   user.email = email;
//   user.name = name;

//   await user.save();

//   const tokenUser = createTokenUser(user as IUserModel);
//   addCookiesToResponse(res, tokenUser);

//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };

const updateUserPassword = async (
  req: IChangePasswordRequest,
  res: Response,
  next: NextFunction,
) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Provide old and new password.');
  }

  const user = await User.findById(userId);

  if (!(await user.comperePassword(oldPassword))) {
    throw new UnauthenticatedError('Password does not match');
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Password changed successfully.' });
};

export { getAllUsers, getCurrentUser, getSingleUser, updateUser, updateUserPassword };
