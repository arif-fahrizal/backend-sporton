import { CategoryRepository } from '../repositories/category.repository';
import { CategoryType } from '../types/category.types';

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getCategories() {
    try {
      return await this.categoryRepository.findCategories();
    } catch (error) {
      console.error('Get Categories Service Error', error);
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      return await this.categoryRepository.findCategoryById(id);
    } catch (error) {
      console.error('Get Category By Id Service Error', error);
      throw error;
    }
  }

  async createCategory(category: CategoryType) {
    try {
      return await this.categoryRepository.createCategory(category);
    } catch (error) {
      console.error('Create Category Service Error', error);
      throw error;
    }
  }

  async updateCategory(id: string, category: CategoryType) {
    try {
      return await this.categoryRepository.findByIdAndUpdateCategory(id, category);
    } catch (error) {
      console.error('Update Category Service Error', error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.categoryRepository.findByIdAndDeleteCategory(id);
    } catch (error) {
      console.error('Delete Category Service Error', error);
      throw error;
    }
  }
}
