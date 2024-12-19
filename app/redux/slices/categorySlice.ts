import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/app/screens/endpoints";

// Async thunk to fetch categories with a "limit" query
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (limit: number, { rejectWithValue }) => {
    try {
      const response = await fetch(API.CATEGORY.GET_CATEGORIES(limit));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch categories.");
      }
      const data = await response.json();
      return data; // Return the categories
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Array to store category data
    status: "", // "" | "loading" | "succeeded" | "failed"
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;
export default categoriesSlice.reducer;
