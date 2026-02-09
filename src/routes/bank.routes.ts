import { Router } from 'express';
import { createBank, deleteBank, getBanks, updateBank } from '../controllers/bank.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.route('/').get(getBanks).post(authMiddleware, createBank);
router.route('/:id').put(authMiddleware, updateBank).delete(authMiddleware, deleteBank);

export default router;
