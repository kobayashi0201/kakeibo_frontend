import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";
import calculatedMonthlyTransactionReducer from "./calculatedMonthlyTransactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    categories: categoryReducer,
    calculatedMonthlyTransactions: calculatedMonthlyTransactionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
