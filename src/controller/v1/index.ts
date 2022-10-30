import { Router, Response, Request } from 'express';
import AuthRouter from '@controller/v1/auth/auth.router';
import AccountRouter from '@controller/v1/account/account.router';

const router = Router();

// v1 api router
router.use('/auth', AuthRouter);
router.use('/account', AccountRouter);

router.route('/').get((_req: Request, res: Response) => {
  return res.json({ msg: 'Player dual API v1' });
});

export default router;
