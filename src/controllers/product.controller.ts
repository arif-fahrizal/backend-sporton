import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { normalizePath } from '../utils/normalizePath.util';

const Product = new ProductService();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { data, pagination } = await Product.getProducts(req);
    res.status(200).json({ success: true, message: 'Products fetched successfully', data, pagination });
  } catch (error) {
    console.error('Get Products Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.getProductById(req.params.id as string);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product fetched successfully', data: product });
  } catch (error) {
    console.error('Get Product By Id Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = normalizePath(req.file.filename);
    }

    const product = await Product.createProduct(productData);
    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error) {
    console.error('Create Product Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = normalizePath(req.file.filename);
    }

    const product = await Product.updateProduct(req.params.id as string, productData);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    console.error('Update Product Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.deleteProduct(req.params.id as string);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
