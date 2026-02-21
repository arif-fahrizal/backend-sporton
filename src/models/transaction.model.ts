import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../types/transaction.types';

const PurchasedSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const TransactionSchema = new Schema(
  {
    paymentProof: { type: String, required: [true, 'Payment Proof is required'] },
    status: { type: String, enum: ['pending', 'paid', 'rejected'], default: 'pending' },
    purchasedItems: { type: [PurchasedSchema], required: [true, 'Purchased Items is required'] },
    totalPayment: { type: Number, required: [true, 'Total Payment is required'] },
    customerName: { type: String, required: [true, 'Customer Name is required'] },
    customerContact: { type: String, required: [true, 'Customer Contact is required'] },
    customerAddress: { type: String, required: [true, 'Customer Address is required'] },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
