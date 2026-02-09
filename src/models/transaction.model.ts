import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchasedItem {
  productId: string;
  quantity: number;
}

export interface ITransaction extends Document {
  paymentProof: string;
  status: 'pending' | 'paid' | 'rejected';
  purchasedItems: IPurchasedItem[];
  totalPayment: number;
  customerName: string;
  customerContact: string;
  customerAddress: string;
}

const PurchasedSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const TransactionSchema = new Schema(
  {
    paymentProof: { type: String, required: true },
    status: { type: String, enum: ['pending', 'paid', 'rejected'], default: 'pending' },
    purchasedItems: { type: [PurchasedSchema], required: true },
    totalPayment: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
    customerAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
