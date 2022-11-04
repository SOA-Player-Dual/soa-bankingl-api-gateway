import { NextFunction, Request, Response } from 'express';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '@helper/jwt';
import { cookieFlags } from '@config/cookie';
import redisClient from '@config/redis';
import createError from 'http-errors';
import { loginPayload, loginResponse } from '@interface/payload';
import axios from 'axios';

export const login = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload: loginPayload = {
      username: _req.body.username,
      password: _req.body.password,
    };
    const { data } = await axios.post<loginResponse>(
      `${process.env.LARAVEL_LOGIN_API}/login`,
      payload,
    );
    //Login success
    const accessToken = signAccessToken({
      _id: data.id.toString()
    });
    const refreshToken = signRefreshToken({ _id: data.id.toString() });
    await redisClient.set(data.id.toString(), refreshToken);
    res.cookie('accessToken', accessToken, cookieFlags);
    res.cookie('refreshToken', refreshToken, cookieFlags);
    return res.json({
      msg: 'Login success',
      data
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response?.status || 401, e.response.data.error || 'Wrong username / password'));
    }
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

export const logout = async (
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
    await redisClient.del(userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ msg: 'Logout successfully' });
  } catch (e) {
    return next(e);
  }
};
