import { Request, Response } from 'express';
import Bank from '../models/bank.model';

export const getBanks = async (req: Request, res: Response) => {
  try {
    const banks = await Bank.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: 'Banks fetched successfully', data: banks });
  } catch (error) {
    console.error('Get Banks Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getBankById = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.findById(req.params.id);

    if (!bank) {
      return res.status(404).json({ success: false, message: 'Bank not found' });
    }

    res.status(200).json({ success: true, message: 'Bank fetched successfully', data: bank });
  } catch (error) {
    console.error('Get Bank By Id Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createBank = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.create(req.body);
    res.status(201).json({ success: true, message: 'Bank created successfully', data: bank });
  } catch (error) {
    console.error('Create Bank Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateBank = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!bank) {
      return res.status(404).json({ success: false, message: 'Bank not found' });
    }

    res.status(200).json({ success: true, message: 'Bank updated successfully', data: bank });
  } catch (error) {
    console.error('Update Bank Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteBank = async (req: Request, res: Response) => {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id);

    if (!bank) {
      return res.status(404).json({ success: false, message: 'Bank not found' });
    }

    res.status(200).json({ success: true, message: 'Bank deleted successfully' });
  } catch (error) {
    console.error('Delete Bank Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
