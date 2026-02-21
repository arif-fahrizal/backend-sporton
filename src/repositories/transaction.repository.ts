import Transaction from '../models/transaction.model';
import { TransactionType } from '../types/transaction.types';

export class TransactionRepository {
  async findTransactions() {
    try {
      return await Transaction.find().sort({ createdAt: -1 }).populate('purchasedItems.productId');
    } catch (error) {
      console.error('Get Transactions Repository Error', error);
      throw error;
    }
  }

  async findTransactionById(id: string) {
    try {
      return await Transaction.findById(id).populate('purchasedItems.productId');
    } catch (error) {
      console.error('Get Transaction By Id Repository Error', error);
      throw error;
    }
  }

  async createTransaction(transaction: TransactionType) {
    try {
      return await Transaction.create(transaction);
    } catch (error) {
      console.error('Create Transaction Repository Error', error);
      throw error;
    }
  }

  async findByIdAndUpdateTransaction(id: string, transaction: TransactionType) {
    try {
      return await Transaction.findByIdAndUpdate(id, transaction, { new: true });
    } catch (error) {
      console.error('Update Transaction Repository Error', error);
      throw error;
    }
  }

  async findByIdAndDeleteTransaction(id: string) {
    try {
      return await Transaction.findByIdAndDelete(id);
    } catch (error) {
      console.error('Delete Transaction Repository Error', error);
      throw error;
    }
  }
}
