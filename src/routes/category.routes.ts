import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

router.route('/').get(getCategories).post(authMiddleware, upload.single('image'), createCategory);

router
  .route('/:id')
  .get(getCategoryById)
  .put(authMiddleware, upload.single('image'), updateCategory)
  .delete(authMiddleware, deleteCategory);

export default router;
