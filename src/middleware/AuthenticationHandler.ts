import { NextFunction, Response } from 'express';
import { UnauthenticatedError, UnauthorizedError } from '../errors/index.js';
import { IAuthenticatedUserRequest } from '../types/ICustomRequest.js';
import { UserRole } from '../types/IUser.js';
import { verifyToken } from '../utils/index.js';

const authenticateUserHandler = (
  req: IAuthenticatedUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid.');
  }

  const payload = verifyToken(token);
  req.user = payload;

  next();
};

const authorizePermissions = (...roles: UserRole[]) => {
  return (req: IAuthenticatedUserRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Access denied');
    }
    next();
  };
};

export { authenticateUserHandler, authorizePermissions };
