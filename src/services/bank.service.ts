import { Request } from 'express';
import { BankRepository } from '../repositories/bank.repository';
import { PaginationType } from '../types/_index';
import { BankQuery, BankType } from '../types/bank.types';

export class BankService {
  private bankRepository: BankRepository;
  constructor() {
    this.bankRepository = new BankRepository();
  }

  async getBanks(req: Request): Promise<{ data: BankType[]; pagination: PaginationType }> {
    try {
      return await this.bankRepository.findBanks(req.query as BankQuery);
    } catch (error) {
      console.error('Get Banks Service Error', error);
      throw error;
    }
  }

  async getBankById(id: string) {
    try {
      return await this.bankRepository.findBankById(id);
    } catch (error) {
      console.error('Get Bank By Id Service Error', error);
      throw error;
    }
  }

  async createBank(bank: BankType) {
    try {
      return await this.bankRepository.createBank(bank);
    } catch (error) {
      console.error('Create Bank Service Error', error);
      throw error;
    }
  }

  async updateBank(id: string, bank: BankType) {
    try {
      return await this.bankRepository.findByIdAndUpdateBank(id, bank);
    } catch (error) {
      console.error('Update Bank Service Error', error);
      throw error;
    }
  }

  async deleteBank(id: string) {
    try {
      return await this.bankRepository.findByIdAndDeleteBank(id);
    } catch (error) {
      console.error('Delete Bank Service Error', error);
      throw error;
    }
  }
}
