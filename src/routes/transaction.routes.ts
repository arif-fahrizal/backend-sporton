import { Router } from 'express';
import { createTransaction, getTransactionById, getTransactions } from '../controllers/transaction.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

router.get('/', authMiddleware, getTransactions);
router.post('/checkout', upload.single('image'), authMiddleware, createTransaction);
router.route('/:id').get(getTransactionById).delete(authMiddleware, createTransaction);

export default router;
