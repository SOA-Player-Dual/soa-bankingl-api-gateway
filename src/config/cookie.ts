import 'dotenv/config';
import {CookieOptions} from "express";

export const cookieFlags: CookieOptions = {
  // secure: process.env.NODE_ENV !== 'development',
  secure: true,
  httpOnly: true,
  sameSite: 'none'
};
