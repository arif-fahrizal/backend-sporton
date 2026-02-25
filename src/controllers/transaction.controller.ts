import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';
import { AppError } from '../utils/errorHandler.util';
import { normalizePath } from '../utils/normalizePath.util';
import { successResponse } from '../utils/response.utils';

const Transaction = new TransactionService();
const Product = new ProductService();

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await Transaction.getTransactions();

    successResponse(res, 200, 'Transactions fetched successfully', transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await Transaction.getTransactionById(req.params.id as string);

    if (!transaction) throw new AppError(404, 'Transaction not found');

    successResponse(res, 200, 'Transaction fetched successfully', transaction);
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
    successResponse(res, 201, 'Transaction created successfully', transaction);
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

    successResponse(res, 200, 'Transaction updated successfully', transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await Transaction.deleteTransaction(req.params.id as string);

    if (!transaction) throw new AppError(404, 'Transaction not found');

    successResponse(res, 204, 'Transaction deleted successfully');
  } catch (error) {
    next(error);
  }
};
