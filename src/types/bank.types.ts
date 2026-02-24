import { BaseQueryTypes } from './_index';

export interface BankType {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface IBank extends BankType, Document {}

export interface BankQuery extends Pick<BaseQueryTypes, 'search' | 'page' | 'limit'> {}
