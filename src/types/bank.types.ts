export interface BankType {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface IBank extends BankType, Document {}
