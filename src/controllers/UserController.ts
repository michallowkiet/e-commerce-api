import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({ msg: 'getAllUsers' });
};

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({ msg: 'getSingleUser' });
};

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({ msg: 'getCurrentUser' });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({ msg: 'getUpdateUser' });
};

const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.OK).json({ msg: 'updateUserPassword' });
};

export { getAllUsers, getCurrentUser, getSingleUser, updateUser, updateUserPassword };
