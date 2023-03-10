import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types/IJWTPayload.js';

const createToken = (payload: IJWTPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });

const verifyToken = (token: string): IJWTPayload => jwt.verify(token, process.env.JWT_SECRET) as IJWTPayload;

export { createToken, verifyToken };
