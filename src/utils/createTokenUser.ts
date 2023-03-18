import { IJWTPayload } from '../types/IJWTPayload.js';
import { IUserModel } from '../types/IUser.js';

const createTokenUser = (user: IUserModel): IJWTPayload => {
  return {
    userId: user._id,
    name: user.name,
    role: user.role,
  };
};

export default createTokenUser;
