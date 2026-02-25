import { NextFunction, Request, Response } from 'express';
import { BankService } from '../services/bank.service';
import { AppError } from '../utils/errorHandler.util';

const Bank = new BankService();

export const getBanks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, pagination } = await Bank.getBanks(req);
    res.status(200).json({ status: 'Success', message: 'Banks fetched successfully', data, pagination });
  } catch (error) {
    next(error);
  }
};

export const getBankById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.getBankById(req.params.id as string);

    if (!bank) throw new AppError(404, 'Bank not found');

    res.status(200).json({ status: 'Success', message: 'Bank fetched successfully', data: bank });
  } catch (error) {
    next(error);
  }
};

export const createBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.createBank(req.body);
    res.status(201).json({ status: 'Success', message: 'Bank created successfully', data: bank });
  } catch (error) {
    next(error);
  }
};

export const updateBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.updateBank(req.params.id as string, req.body);

    if (!bank) throw new AppError(404, 'Bank not found');

    res.status(200).json({ status: 'Success', message: 'Bank updated successfully', data: bank });
  } catch (error) {
    next(error);
  }
};

export const deleteBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.deleteBank(req.params.id as string);

    if (!bank) throw new AppError(404, 'Bank not found');

    res.status(200).json({ status: 'Success', message: 'Bank deleted successfully' });
  } catch (error) {
    next(error);
  }
};
