import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], minLength: [3, 'Name must be at least 3 characters'] },
    email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email already exists'] },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
