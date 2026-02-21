import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../types/category.types';

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Category Name is required'] },
    description: {
      type: String,
      maxLength: [100, 'Category Description cannot exceed 100 characters'],
      required: [true, 'Category Description is required'],
    },
    image: { type: String, required: [true, 'Category Image is required'] },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', categorySchema);
