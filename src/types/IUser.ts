export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface IUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export default IUser;
