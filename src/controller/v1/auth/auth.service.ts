import { NextFunction, Request, Response } from 'express';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import { cookieFlags } from '@config/cookie';
import { compare, hash } from '@helper/hash';
import redisClient from '@config/redis';
import createError from 'http-errors';

// TODO connect to grpc services
export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: IUser | undefined = await User.findOne({
      username: _req.body.username,
    });

    //Login error
    if (!user) return next(new createError.Unauthorized('Username not found'));
    if (!compare(_req.body.password, user.password))
      return next(new createError.Unauthorized('Wrong password'));

    //Login success
    const accessToken = signAccessToken({
      _id: user._id,
    });
    const refreshToken = signRefreshToken({ _id: user._id });
    await redisClient.set(user._id.toString(), refreshToken);
    res.cookie('accessToken', accessToken, cookieFlags);
    res.cookie('refreshToken', refreshToken, cookieFlags);
    return res.json({
      msg: 'Login success',
    });
  } catch (e) {
    return next(e);
  }
};

export const register = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hashPassword = hash(_req.body.password);
    const additions = {
      password: hashPassword,
      urlCode: _req.body.nickname,
    };
    if (await User.findOne({ username: _req.body.username }))
      return next(new createError.Unauthorized('Username already exist'));
    if (await User.findOne({ email: _req.body.email }))
      return next(new createError.Unauthorized('Email already exist'));
    const newUser = new User({ ..._req.body, ...additions });
    await newUser.save();
    return res.json({ msg: 'Register success' });
  } catch (e) {
    return next(e);
  }
};

export const renewRefreshToken = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = _req.cookies['refreshToken'];
    const userId = verifyRefreshToken(refreshToken);

    //Error with refresh token
    if (!userId)
      return next(
        new createError.Unauthorized(
          'Something wrong with your token, please try login again',
        ),
      );
    const oldRefreshToken = await redisClient.get(userId);
    if (oldRefreshToken !== refreshToken) {
      await redisClient.del(userId);
      return next(
        new createError.Unauthorized(
          'Something wrong with your session, please try login again',
        ),
      );
    }

    //Refresh token legit
    const newAccessToken = signAccessToken({ _id: userId });
    const newRefreshToken = signRefreshToken({ _id: userId });
    res.cookie('accessToken', newAccessToken, cookieFlags);
    res.cookie('refreshToken', newRefreshToken, cookieFlags);
    await redisClient.set(userId, newRefreshToken);
    return res.json({ msg: 'Get access token successfully' });
  } catch (e) {
    return next(e);
  }
};
