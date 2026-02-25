import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';

const Transaction = new TransactionService();
const Product = new ProductService();

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.getTransactions();
    res.status(200).json({ status: 'Success', message: 'Transactions fetched successfully', data: transactions });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await Transaction.getTransactionById(req.params.id as string);

    if (!transaction) throw new AppError(404, 'Transaction not found');

    res.status(200).json({ status: 'Success', message: 'Transaction fetched successfully', data: transaction });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionBody = req.body;

    if (req.file) {
      transactionBody.paymentProof = normalizePath(req.file.filename);
    } else {
      return res.status(400).json({ success: false, message: 'Payment proof is required' });
    }

    if (typeof transactionBody.purchasedItems === 'string') {
      transactionBody.purchasedItems = JSON.parse(transactionBody.purchasedItems);
    }

    transactionBody.status = 'pending';

    const transaction = await Transaction.createTransaction(transactionBody);
    res.status(201).json({ status: 'Success', message: 'Transaction created successfully', data: transaction });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    const existingTransaction = await Transaction.getTransactionById(req.params.id as string);

    if (!existingTransaction) throw new AppError(404, 'Transaction not found');

    if (status === 'paid' && existingTransaction.status !== 'paid') {
      for (const item of existingTransaction.purchasedItems) {
        await Product.updateProduct(item.productId, { $inc: { stock: -item.quantity } } as any);
      }
    }

    const transaction = await Transaction.updateTransaction(req.params.id as string, { status } as any);

    if (!transaction) throw new AppError(404, 'Transaction not found');

    res.status(200).json({ status: 'Success', message: 'Transaction updated successfully', data: transaction });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await Transaction.deleteTransaction(req.params.id as string);

    if (!transaction) throw new AppError(404, 'Transaction not found');

    res.status(200).json({ status: 'Success', message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};
