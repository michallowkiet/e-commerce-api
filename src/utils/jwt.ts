import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types/IJWTPayload.js';

const createToken = (payload: IJWTPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

const verifyToken = (token: string): IJWTPayload =>
  jwt.verify(token, process.env.JWT_SECRET) as IJWTPayload;

const addCookiesToResponse = (res: Response, userPayload: IJWTPayload) => {
  const token = createToken(userPayload);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

export { createToken, verifyToken, addCookiesToResponse };
