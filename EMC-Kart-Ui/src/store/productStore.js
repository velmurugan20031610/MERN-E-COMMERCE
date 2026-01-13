import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeAuthenticatedRequest } from "../service/axiosService";

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await makeAuthenticatedRequest(
        "api/product/create",
        "POST",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* ===============================
   PRODUCT SLICE
================================ */
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    productData: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* CREATE PRODUCT */
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
        state.status = "success";
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Product upload failed";
        state.status = "error";
      });
  },
});

export default productSlice.reducer;
