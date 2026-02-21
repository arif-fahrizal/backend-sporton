import Bank from '../models/bank.model';
import { BankType } from '../types/bank.types';

export class BankRepository {
  async findBanks() {
    try {
      return await Bank.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Get Banks Repository Error', error);
      throw error;
    }
  }

  async findBankById(id: string) {
    try {
      return await Bank.findById(id);
    } catch (error) {
      console.error('Get Bank By Id Repository Error', error);
      throw error;
    }
  }

  async createBank(bank: BankType) {
    try {
      return await Bank.create(bank);
    } catch (error) {
      console.error('Create Bank Repository Error', error);
      throw error;
    }
  }

  async findByIdAndUpdateBank(id: string, bank: BankType) {
    try {
      return await Bank.findByIdAndUpdate(id, bank, { new: true });
    } catch (error) {
      console.error('Update Bank Repository Error', error);
      throw error;
    }
  }

  async findByIdAndDeleteBank(id: string) {
    try {
      return await Bank.findByIdAndDelete(id);
    } catch (error) {
      console.error('Delete Bank Repository Error', error);
      throw error;
    }
  }
}
