import { Router } from 'express';
import {
  getHistory,
  getOTP,
  getSurplusInfo,
  getTuitionInfo,
  verifyOTP,
} from '@controller/v1/account/account.services';

const router = Router();

router.route('/tuition/:studentID').get(getTuitionInfo);
router.route('/surplus/:userID').get(getSurplusInfo);
router.route('/otp').post(getOTP).put(verifyOTP);
router.route('/history').get(getHistory);

export default router;
