import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';
import { successResponse } from '../utils/response.utils';

const Category = new CategoryService();

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.getCategories();

    successResponse(res, 200, 'Categories fetched successfully', categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.getCategoryById(req.params.id as string);

    if (!category) throw new AppError(404, 'Category not found');
    successResponse(res, 200, 'Category fetched successfully', category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = req.body;

    if (req.file) {
      categoryData.image = normalizePath(req.file.filename);
    }

    const category = await Category.createCategory(categoryData);
    successResponse(res, 201, 'Category created successfully', category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = req.body;

    if (req.file) {
      categoryData.image = normalizePath(req.file.filename);
    }

    const category = await Category.updateCategory(req.params.id as string, categoryData);

    if (!category) throw new AppError(404, 'Category not found');
    successResponse(res, 200, 'Category updated successfully', category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.deleteCategory(req.params.id as string);

    if (!category) throw new AppError(404, 'Category not found');
    successResponse(res, 201, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};
