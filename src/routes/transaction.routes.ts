import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from '../controllers/transaction.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

router.get('/', authMiddleware, getTransactions);
router.post('/checkout', upload.single('image'), createTransaction);
router
  .route('/:id')
  .get(getTransactionById)
  .put(authMiddleware, updateTransaction)
  .delete(authMiddleware, deleteTransaction);

export default router;
