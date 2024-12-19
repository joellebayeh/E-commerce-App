import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { API } from "@/app/screens/endpoints";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    params: { limit: number; offset: number; categoryId?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        params.categoryId
          ? API.CATEGORY.GET_PRODUCTS_BY_CAT(
              params.categoryId,
              params.limit,
              params.offset
            )
          : API.PRODUCT_LIST(params.limit, params.offset)
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Products.");
      }

      const data = await response.json();
      return { data: data, offset: params.offset };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productListSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Array to store product list
    checkedEmpty: [], // this state used to check the last product page
    status: "", // "" | "loading" | "succeeded" | "failed"
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.checkedEmpty = action.payload.data;
        state.products = !action.payload.offset
          ? action.payload.data
          : [...state.products, ...action.payload.data]; // add the new product list to he old one
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectProducts = (state: RootState) => state.products;
export default productListSlice.reducer;