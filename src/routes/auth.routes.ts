import { Router } from 'express';
import { signInUser, signUpUser } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/sign-in', signInUser);
router.post('/sign-up', signUpUser);

export default router;
