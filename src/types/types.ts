export interface Transaction {
  id: number;
  amount: number;
  date: Date | null;
  description: string | null;
  userId: number;
  categoryId: number;
}

export interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
