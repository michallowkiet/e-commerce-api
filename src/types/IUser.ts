export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserMethods {
  comperePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserResponse {
  name: string;
  email: string;
  role: UserRole;
}
interface IUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUserModel extends IUser {
  _id: string;
}

export default IUser;
