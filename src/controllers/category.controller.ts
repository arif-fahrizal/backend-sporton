import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';

const Category = new CategoryService();

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.getCategories();

    res.status(200).json({ status: 'Success', message: 'Categories fetched successfully', data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.getCategoryById(req.params.id as string);

    if (!category) throw new AppError(404, 'Category not found');

    res.status(200).json({ status: 'Success', message: 'Category fetched successfully', data: category });
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

    res.status(201).json({ status: 'Success', message: 'Category created successfully', data: category });
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

    res.status(200).json({ status: 'Success', message: 'Category updated successfully', data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.deleteCategory(req.params.id as string);

    if (!category) throw new AppError(404, 'Category not found');

    res.status(200).json({ status: 'Success', message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
