import mongoose from 'mongoose';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { IJWTPayload } from '../types/IJWTPayload.js';
import { UserRole } from '../types/IUser.js';

const checkPermissions = (requestUser: IJWTPayload, resourceUserId: mongoose.Types.ObjectId) => {
  if (requestUser.role === UserRole.ADMIN) return;
  if (resourceUserId.equals(requestUser.userId)) return;

  throw new UnauthorizedError('Access denied');
};

export default checkPermissions;
