import mongoose from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUserMethods {
  comperePassword: (val: string) => Promise<boolean>;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUpdateUser {
  name: string;
  email: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserModel {
  _id: mongoose.Types.ObjectId;
  name: string;
  role: UserRole;
}

interface IUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export default IUser;
