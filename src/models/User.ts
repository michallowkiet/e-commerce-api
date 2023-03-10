import mongoose from 'mongoose';
import validator from 'validator';
import IUser, { UserRole } from '../utils/types/IUser.js';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide name.'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: (val: string) => validator.default.isEmail(val),
      message: 'Please provide valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    min: 6,
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comperePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

export default User;
