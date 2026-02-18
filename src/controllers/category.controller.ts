import { Request, Response } from 'express';
import Category from '../models/category.model';
import { normalizePath } from '../utils/normalizePath';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: 'Categories fetched successfully', data: categories });
  } catch (error) {
    console.error('Get Categories Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category fetched successfully', data: category });
  } catch (error) {
    console.error('Get Category By Id Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;

    if (req.file) {
      categoryData.image = normalizePath(req.file.filename);
    }

    const category = await Category.create(categoryData);

    res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  } catch (error) {
    console.error('Create Category Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;

    if (req.file) {
      categoryData.image = normalizePath(req.file.filename);
    }

    const category = await Category.findByIdAndUpdate(req.params.id, categoryData, { new: true });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
  } catch (error) {
    console.error('Update Category Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
