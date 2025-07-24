import jwt from 'jsonwebtoken';
import { Response } from 'express';
import config from '../config';

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, config.jwt_secret as string, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: config.node_env !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
