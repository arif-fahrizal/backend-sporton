import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionType } from '../types/transaction.types';

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async getTransactions() {
    try {
      return await this.transactionRepository.findTransactions();
    } catch (error) {
      console.error('Get Transactions Service Error', error);
      throw error;
    }
  }

  async getTransactionById(id: string) {
    try {
      return await this.transactionRepository.findTransactionById(id);
    } catch (error) {
      console.error('Get Transaction By Id Service Error', error);
      throw error;
    }
  }

  async createTransaction(transaction: TransactionType) {
    try {
      return await this.transactionRepository.createTransaction(transaction);
    } catch (error) {
      console.error('Create Transaction Service Error', error);
      throw error;
    }
  }

  async updateTransaction(id: string, transaction: TransactionType) {
    try {
      return await this.transactionRepository.findByIdAndUpdateTransaction(id, transaction);
    } catch (error) {
      console.error('Update Transaction Service Error', error);
      throw error;
    }
  }

  async deleteTransaction(id: string) {
    try {
      return await this.transactionRepository.findByIdAndDeleteTransaction(id);
    } catch (error) {
      console.error('Delete Transaction Service Error', error);
      throw error;
    }
  }
}
