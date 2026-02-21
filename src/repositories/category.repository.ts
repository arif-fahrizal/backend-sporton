import Category from '../models/category.model';
import { CategoryType } from '../types/category.types';

export class CategoryRepository {
  async findCategories() {
    try {
      return await Category.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Get Categories Repository Error', error);
      throw error;
    }
  }

  async findCategoryById(id: string) {
    try {
      return await Category.findById(id);
    } catch (error) {
      console.error('Get Category By Id Repository Error', error);
      throw error;
    }
  }

  async createCategory(category: CategoryType) {
    try {
      return await Category.create(category);
    } catch (error) {
      console.error('Create Category Repository Error', error);
      throw error;
    }
  }

  async findByIdAndUpdateCategory(id: string, category: CategoryType) {
    try {
      return await Category.findByIdAndUpdate(id, category, { new: true });
    } catch (error) {
      console.error('Update Category Repository Error', error);
      throw error;
    }
  }

  async findByIdAndDeleteCategory(id: string) {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      console.error('Delete Category Repository Error', error);
      throw error;
    }
  }
}
