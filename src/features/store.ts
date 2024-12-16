import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
