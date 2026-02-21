import { Document } from 'mongoose';

export interface IPurchasedItem {
  productId: string;
  quantity: number;
}

export interface TransactionType {
  paymentProof: string;
  status: 'pending' | 'paid' | 'rejected';
  purchasedItems: IPurchasedItem[];
  totalPayment: number;
  customerName: string;
  customerContact: string;
  customerAddress: string;
}

export interface ITransaction extends TransactionType, Document {}
