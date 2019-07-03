import { Router } from 'express';
import userCtrl from '../controllers/user';

const router = Router();


router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

export default router;
