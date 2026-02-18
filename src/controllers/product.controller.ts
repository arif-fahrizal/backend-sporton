import { Request, Response } from 'express';
import Product from '../models/product.model';
import { normalizePath } from '../utils/normalizePath';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('category').sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: 'Products fetched successfully', data: products });
  } catch (error) {
    console.error('Get Products Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

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

    const product = await Product.create(productData);
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

    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });

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
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
