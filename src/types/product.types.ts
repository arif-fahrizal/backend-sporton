import mongoose, { Document } from 'mongoose';

export interface ProductType {
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
}

export interface IProduct extends ProductType, Document {}
