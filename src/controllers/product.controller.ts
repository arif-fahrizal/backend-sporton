import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';

const Product = new ProductService();

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, pagination } = await Product.getProducts(req);
    res.status(200).json({ status: 'Success', message: 'Products fetched successfully', data, pagination });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.getProductById(req.params.id as string);

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({ status: 'Success', message: 'Product fetched successfully', data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = normalizePath(req.file.filename);
    }

    const product = await Product.createProduct(productData);
    res.status(201).json({ status: 'Success', message: 'Product created successfully', data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = normalizePath(req.file.filename);
    }

    const product = await Product.updateProduct(req.params.id as string, productData);

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({ status: 'Success', message: 'Product updated successfully', data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.deleteProduct(req.params.id as string);

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    res.status(200).json({ status: 'Success', message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
