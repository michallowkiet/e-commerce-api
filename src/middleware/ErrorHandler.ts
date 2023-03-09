import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ICustomError from '../utils/types/ICustomError.js';

const ErrorHandler = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  const customError: ICustomError = {
    name: err.name,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };

  // if (err.name === 'ValidationError') {
  //   customError.msg = Object.values(err.errors)
  //     .map((error) => error.message)
  //     .join(',');
  //   customError.statusCode = 400;
  // }
  // if (err.code && err.code === 11000) {
  //   customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
  //   customError.statusCode = 400;
  // }
  // if (err.name === 'CastError') {
  //   customError.msg = `No item found with id : ${err.value}`;
  //   customError.statusCode = 404;
  // }

  return res.status(customError.statusCode).json({ message: customError.message });
};

export default ErrorHandler;
