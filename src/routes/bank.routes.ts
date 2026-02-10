import { Router } from 'express';
import { createBank, deleteBank, getBankById, getBanks, updateBank } from '../controllers/bank.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

router.route('/').get(getBanks).post(authMiddleware, createBank);
router.route('/:id').get(getBankById).put(authMiddleware, updateBank).delete(authMiddleware, deleteBank);

export default router;
