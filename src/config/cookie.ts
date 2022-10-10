import 'dotenv/config';

export const cookieFlags = {
  secure: process.env.NODE_ENV !== 'development',
  httpOnly: true,
};
