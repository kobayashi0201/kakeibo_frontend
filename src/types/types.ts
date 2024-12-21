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
