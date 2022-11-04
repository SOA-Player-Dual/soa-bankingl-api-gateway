import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import axios from 'axios';
import { tuitionResponse } from '@interface/payload';

export const getTuitionInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await axios.get<tuitionResponse>(
      `${process.env.LARAVEL_TUITION_API}/get-tuition`,
      { params: { student_id: _req.params['studentID'] } },
    );
    return res.json({ msg: 'Ok', data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status));
    }
    return next(e);
  }
};

export const getSurplusInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await axios.get(
      `https://soa-midterm.000webhostapp.com/api/get-surplus?user_id=${_req.params.userID}`,
    );
    return res.json({ msg: 'ok', data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status, e.response.data.error));
    }
    return next(e);
  }
};

export const getOTP = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await axios.post(`${process.env.LARAVEL_TUITION_API}/otp/send`, {
      student_id: _req.body.mssv,
      user_id: _req.body.userID,
    });
    return res.json({ msg: 'Check your email to get OTP' });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status, e.response.data.error));
    }
    return next(e);
  }
};

export const verifyOTP = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await axios.post(`${process.env.LARAVEL_TUITION_API}/otp/verify`, {
      user_id: _req.body.userID,
      otp_code: _req.body.otp,
    });
    return res.json({ msg: 'Verify OTP' });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status, e.response.data.error));
    }
    return next(e);
  }
};

export const getHistory = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await axios.get(
      `${process.env.LARAVEL_LOGIN_API}/transaction-history?user_id=${res.locals?._id}`,
    );
    return res.json({ msg: 'Get history successfully', data });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status, e.response.data.error));
    }
    return next(e);
  }
};
