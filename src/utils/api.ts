import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toSnakeCase } from "./caseUtils";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (
    transaction: {
      amount: number;
      date: string | null;
      description: string | undefined;
      userId: number;
      categoryId: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post(
        "/transactions",
        toSnakeCase(transaction),
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);
