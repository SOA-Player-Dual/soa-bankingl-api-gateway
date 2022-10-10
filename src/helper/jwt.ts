import jwt from 'jsonwebtoken';
import 'dotenv/config';

export interface IJwt {
  _id: string;
  iat: number;
  exp: number;
}

export const signAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1m' });
};

export const signRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1y' });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET) as IJwt;
    return decoded._id;
  } catch (err) {
    return '';
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET) as IJwt;
    return decoded._id;
  } catch (err) {
    return '';
  }
};
