import { Router } from "express";
import { login, register, renewRefreshToken } from '@controller/v1/auth/auth.service'

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/refresh').post(renewRefreshToken);

export default router;
