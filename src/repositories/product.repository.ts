import mongoose from 'mongoose';
import Product from '../models/product.model';
import { BaseQueryTypes, PaginationType } from '../types/_index';
import { ProductType } from '../types/product.types';

export class ProductRepository {
  async findProducts(query: BaseQueryTypes): Promise<{ data: ProductType[]; pagination: PaginationType }> {
    try {
      const { search, sort = 'desc', page = 1, limit = 10, category, minPrice, maxPrice, inStock } = query;

      const filter: any = {};

      if (search && search.trim() !== '') {
        filter.name = { $regex: search, $options: 'i' };
      }

      if (category && mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
      }

      if (inStock) {
        filter.stock = { $gt: 0 };
      }

      const pageNumber = Math.max(1, Number(page));
      const limitNumber = Math.max(10, Number(limit));
      const skip = (pageNumber - 1) * limitNumber;
      const sortOrder = sort === 'asc' ? 1 : -1;

      const [data, total] = await Promise.all([
        Product.find(filter).populate('category').sort({ createdAt: sortOrder }).skip(skip).limit(limitNumber).lean(),
        Product.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limitNumber);
      const pagination = { page: pageNumber, limit: limitNumber, total, totalPages };

      return { data, pagination };
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
