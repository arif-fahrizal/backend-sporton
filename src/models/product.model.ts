import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/product.types';

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      maxLength: [50, 'Product Name cannot exceed 50 characters'],
      required: [true, 'Product Name is required'],
    },
    description: {
      type: String,
      maxLength: [100, 'Product Description cannot exceed 100 characters'],
      required: [true, 'Product Description is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Product Stock is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
    },
    image: { type: String, required: [true, 'Product Image is required'] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product Category is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', productSchema);
