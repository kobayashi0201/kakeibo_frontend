import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toSnakeCase } from "./caseUtils";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/transactions");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

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

export const destoryTransaction = createAsyncThunk(
  "transactions/destroyTransactions",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  },
);

export const destoryMultipleTransactions = createAsyncThunk(
  "transactions/destroyMultipleTransactions",
  async (ids: number[], { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        "/transactions/destroy_multiple",
        {
          data: { ids },
        },
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
