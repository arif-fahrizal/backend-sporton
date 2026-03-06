import { Router } from 'express';
import { signInUser, signUpUser } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);

export default router;
