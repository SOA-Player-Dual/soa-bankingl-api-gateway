import { Router } from "express";
import {login, logout, renewRefreshToken} from '@controller/v1/auth/auth.service'

const router = Router();

router.route('/login').post(login);
router.route('/refresh').post(renewRefreshToken);
router.route('/logout').post(logout);

export default router;
