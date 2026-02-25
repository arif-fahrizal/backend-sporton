import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';
import { successResponse } from '../utils/response.utils';

const Product = new ProductService();

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, pagination } = await Product.getProducts(req);

    successResponse(res, 200, 'Products fetched successfully', data, pagination);
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
    successResponse(res, 200, 'Product fetched successfully', product);
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
    successResponse(res, 201, 'Product created successfully', product);
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
    successResponse(res, 200, 'Product updated successfully', product);
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
    successResponse(res, 204, 'Product deleted successfully', product);
  } catch (error) {
    next(error);
  }
};
