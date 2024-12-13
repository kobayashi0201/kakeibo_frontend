import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransaction } from "@/src/utils/api";

interface Transaction {
  id: number;
  amount: number;
  date: Date | null;
  description: string | null;
  userId: number;
  categoryId: number;
}

interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  status: "idle",
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    deleteTransaction(state, action: PayloadAction<number>) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
