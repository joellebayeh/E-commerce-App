import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/app/screens/endpoints";

export interface AddProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// Async thunk to add a product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData: AddProductPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(API.PRODUCTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    status: "", // "" | "loading" | "succeeded" | "failed"
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectAddProduct = (state: RootState) => state.addProduct;
export default addProductSlice.reducer;
