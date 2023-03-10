import mongoose from 'mongoose';
import { UserRole } from '../types/IUser.js';

export interface IJWTPayload {
  userId: mongoose.Types.ObjectId;
  name: string;
  role: UserRole;
}
