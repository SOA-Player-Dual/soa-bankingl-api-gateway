import { Router } from 'express';
import {
  getOTP,
  getTuitionInfo,
  verifyOTP,
} from '@controller/v1/account/account.services';

const router = Router();

router.route('/tuition/:studentID').get(getTuitionInfo);
router.route('/otp')
    .post(getOTP)
    .patch(verifyOTP);

export default router;
