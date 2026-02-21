import mongoose, { Schema } from 'mongoose';
import { IBank } from '../types/bank.types';

const BankSchema = new Schema(
  {
    bankName: {
      type: String,
      maxLength: [50, 'Bank Name cannot exceed 50 characters'],
      required: [true, 'Bank Name is required'],
    },
    accountName: {
      type: String,
      maxLength: [50, 'Account Name cannot exceed 50 characters'],
      required: [true, 'Account Name is required'],
    },
    accountNumber: {
      type: String,
      maxLength: [50, 'Bank Number cannot exceed 50 characters'],
      required: [true, 'Account Number is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBank>('Bank', BankSchema);
