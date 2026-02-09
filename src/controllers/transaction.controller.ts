import { Request, Response } from 'express';
import Product from '../models/product.model';
import Transaction from '../models/transaction.model';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).populate('purchasedItems.productId');
    res.status(200).json({ success: true, message: 'Transactions fetched successfully', transactions });
  } catch (error) {
    console.error('Get Transactions Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('purchasedItems.productId');

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({ success: true, message: 'Transaction fetched successfully', transaction });
  } catch (error) {
    console.error('Get Transaction By Id Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transactionBody = req.body;

    if (req.file) {
      transactionBody.paymentProof = req.file.path;
    } else {
      return res.status(400).json({ success: false, message: 'Payment proof is required' });
    }

    if (typeof transactionBody.purchasedItems === 'string') {
      transactionBody.purchasedItems = JSON.parse(transactionBody.purchasedItems);
    }

    transactionBody.status = 'pending';

    const transaction = await Transaction.create(transactionBody);
    res.status(201).json({ success: true, message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Create Transaction Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const existingTransaction = await Transaction.findById(req.params.id);

    if (!existingTransaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    if (status === 'paid' && existingTransaction.status !== 'paid') {
      for (const item of existingTransaction.purchasedItems) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
      }
    }

    const transaction = await Transaction.findByIdAndUpdate(req.params.id, status, { new: true });

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({ success: true, message: 'Transaction updated successfully', transaction });
  } catch (error) {
    console.error('Update Transaction Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete Transaction Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
