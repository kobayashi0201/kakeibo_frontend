import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
} from "@/src/utils/api";
import { CategoryState } from "@/src/types/types";

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  }
});

export default categorySlice.reducer;
