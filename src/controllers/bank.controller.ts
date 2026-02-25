import { NextFunction, Request, Response } from 'express';
import { BankService } from '../services/bank.service';
import { AppError } from '../utils/errorHandler.util';
import { successResponse } from '../utils/response.utils';

const Bank = new BankService();

export const getBanks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, pagination } = await Bank.getBanks(req);

    successResponse(res, 200, 'Banks fetched successfully', data, pagination);
  } catch (error) {
    next(error);
  }
};

export const getBankById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.getBankById(req.params.id as string);

    if (!bank) throw new AppError(404, 'Bank not found');

    successResponse(res, 200, 'Bank fetched successfully', bank);
  } catch (error) {
    next(error);
  }
};

export const createBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.createBank(req.body);
    successResponse(res, 201, 'Bank created successfully', bank);
  } catch (error) {
    next(error);
  }
};

export const updateBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.updateBank(req.params.id as string, req.body);

    if (!bank) throw new AppError(404, 'Bank not found');

    successResponse(res, 200, 'Bank updated successfully', bank);
  } catch (error) {
    next(error);
  }
};

export const deleteBank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bank = await Bank.deleteBank(req.params.id as string);

    if (!bank) throw new AppError(404, 'Bank not found');

    successResponse(res, 204, 'Bank deleted successfully');
  } catch (error) {
    next(error);
  }
};
