import { createSlice } from "@reduxjs/toolkit";
import { fetchCalculatedMonthlyTransactions } from "@/src/utils/api";
import { CalculatedMonthlyTransactionState } from "@/src/types/types";

const initialState: CalculatedMonthlyTransactionState = {
  calculatedMonthlyTransactions: [],
  status: "idle",
  error: null,
};

const calculatedMonthlyTransactionSlice = createSlice({
  name: "calculatedMonthlyTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalculatedMonthlyTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCalculatedMonthlyTransactions.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.calculatedMonthlyTransactions = action.payload;
        },
      )
      .addCase(fetchCalculatedMonthlyTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default calculatedMonthlyTransactionSlice.reducer;
