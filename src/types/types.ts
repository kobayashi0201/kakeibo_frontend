export interface Transaction {
  id: number;
  amount: number;
  date: Date | null;
  description: string | null;
  userId: number;
  categoryId: number;
  transactionType: string;
}

export interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
  userId: number;
}

export interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface CalculatedMonthlyTransaction {
  id: number;
  month: Date;
  total: number;
  totalByCategory: { [key: string]: number };
  percentageByCategory: { [key: string]: number };
  transactionType: string;
  userId: number;
}

export interface CalculatedMonthlyTransactionState {
  calculatedMonthlyTransactions: CalculatedMonthlyTransaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
