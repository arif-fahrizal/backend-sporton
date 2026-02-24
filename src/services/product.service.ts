import { ProductRepository } from '../repositories/product.repository';
import { ProductType } from '../types/product.types';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts() {
    try {
      return await this.productRepository.findProducts();
    } catch (error) {
      console.error('Get Products Service Error', error);
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      return await this.productRepository.findProductById(id);
    } catch (error) {
      console.error('Get Product By Id Service Error', error);
      throw error;
    }
  }

  async createProduct(product: ProductType) {
    try {
      return await this.productRepository.createProduct(product);
    } catch (error) {
      console.error('Create Product Service Error', error);
      throw error;
    }
  }

  async updateProduct(id: string, product: ProductType) {
    try {
      return await this.productRepository.findByIdAndUpdateProduct(id, product);
    } catch (error) {
      console.error('Update Product Service Error', error);
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      return await this.productRepository.findByIdAndDeleteProduct(id);
    } catch (error) {
      console.error('Delete Product Service Error', error);
      throw error;
    }
  }
}
