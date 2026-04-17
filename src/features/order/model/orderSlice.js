import { createSlice } from "@reduxjs/toolkit";
import { submitOrder } from "./orderThunks";

const initialState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderState(state) {
      state.isSubmitting = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.error = action.payload || "Failed to submit order";
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
