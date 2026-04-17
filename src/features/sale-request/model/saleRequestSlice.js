import { createSlice } from "@reduxjs/toolkit";
import { submitSaleRequest } from "./saleRequestThunks";

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
};

const saleRequestSlice = createSlice({
  name: "saleRequest",
  initialState,
  reducers: {
    resetSaleRequestState(state) {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSaleRequest.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(submitSaleRequest.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(submitSaleRequest.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.error = action.payload || "Failed to submit discount request";
      });
  },
});

export const { resetSaleRequestState } = saleRequestSlice.actions;
export default saleRequestSlice.reducer;
