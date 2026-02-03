import { Router } from 'express';
import { initiateAdmin, signInUser } from '../controllers/auth.controller';

const router: Router = Router();

router.post('/signin', signInUser);
router.post('/initiate-admin', initiateAdmin);

export default router;
