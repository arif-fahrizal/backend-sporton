import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  imageUlr: string;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUlr: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', categorySchema);
