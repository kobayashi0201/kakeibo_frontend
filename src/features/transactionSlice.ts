import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  createTransaction,
  destoryTransaction,
  destoryMultipleTransactions,
} from "@/src/utils/api";
import { TransactionState } from "@/src/types/types";

const initialState: TransactionState = {
  transactions: [],
  status: "idle",
  error: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(destoryTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
      })
      .addCase(destoryTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(destoryMultipleTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
      })
      .addCase(destoryMultipleTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
