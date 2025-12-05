export type TransactionType = 'income' | 'expense';
export type Owner = 'person1' | 'person2' | 'shared';

export interface Transaction {
  id: string;
  type: TransactionType;
  owner: Owner;
  category: string;
  amount: number;
  description: string;
  date: string;
  isRecurring: boolean;
  isInstallment: boolean;
  installmentCurrent?: number;
  installmentTotal?: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  person1Income: number;
  person2Income: number;
  sharedIncome: number;
  person1Expenses: number;
  person2Expenses: number;
  sharedExpenses: number;
}
