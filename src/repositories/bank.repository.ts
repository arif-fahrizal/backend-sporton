import Bank from '../models/bank.model';
import { PaginationType } from '../types/_index';
import { BankQuery, BankType } from '../types/bank.types';

export class BankRepository {
  async findBanks(query: BankQuery = {}): Promise<{ data: BankType[]; pagination: PaginationType }> {
    try {
      const { search, page = 1, limit = 10 } = query;

      const filter: any = {};
      const pageNumber = Math.max(1, Number(page));
      const limitNumber = Math.max(10, Number(limit));
      const skip = (pageNumber - 1) * limitNumber;

      if (search && search.trim() !== '') {
        filter.bankName = { $regex: search, $options: 'i' };
      }

      const [data, total] = await Promise.all([
        Bank.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNumber).lean(),
        Bank.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limitNumber);
      const pagination = { page: pageNumber, limit: limitNumber, total, totalPages };

      return { data, pagination };
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
