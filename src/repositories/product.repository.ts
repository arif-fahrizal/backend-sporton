import Product from '../models/product.model';
import { ProductType } from '../types/product.types';

export class ProductRepository {
  async findProducts() {
    try {
      return await Product.find().populate('category').sort({ createdAt: -1 });
    } catch (error) {
      console.error('Get Products Repository Error', error);
      throw error;
    }
  }

  async findProductById(id: string) {
    try {
      return await Product.findById(id).populate('category');
    } catch (error) {
      console.error('Get Product By Id Repository Error', error);
      throw error;
    }
  }

  async createProduct(product: ProductType) {
    try {
      return await Product.create(product);
    } catch (error) {
      console.error('Create Product Repository Error', error);
      throw error;
    }
  }

  async findByIdAndUpdateProduct(id: string, product: ProductType) {
    try {
      return await Product.findByIdAndUpdate(id, product, { new: true });
    } catch (error) {
      console.error('Update Product Repository Error', error);
      throw error;
    }
  }

  async findByIdAndDeleteProduct(id: string) {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      console.error('Delete Product Repository Error', error);
      throw error;
    }
  }
}
