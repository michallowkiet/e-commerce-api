import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import ICustomError from '../types/ICustomError.js';
import { Error } from 'mongoose';
import { MongoServerError } from 'mongodb';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err as ICustomError;

  const customError: ICustomError = {
    name: error.name,
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.message = Object.values((err as Error.ValidationError).errors)
      .map((error) => error.message)
      .join(',');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id : ${(err as Error.CastError).value}`;
    customError.statusCode = 404;
  }

  if ((err as MongoServerError).code && (err as MongoServerError).code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      (err as MongoServerError).keyValue,
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
};

export default ErrorHandler;
