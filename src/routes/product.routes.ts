import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router: Router = Router();

router.route('/').get(getProducts).post(authMiddleware, upload.single('image'), createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(authMiddleware, upload.single('image'), updateProduct)
  .delete(authMiddleware, deleteProduct);

export default router;
