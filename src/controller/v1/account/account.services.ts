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

export const getOTP = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { data } = await axios.post(
      `${process.env.LARAVEL_TUITION_API}/otp/send`,
      { mssv: _req.body.mssv },
    );
    return res.json({ msg: 'Get OTP', data: { otp: data.otp } });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status));
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
    return res.json({ msg: 'Verify OTP' });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return next(createError(e.response.status));
    }
    return next(e);
  }
};
