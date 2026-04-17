import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder } from "../../../shared/api/orderApi";

export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (payload, { rejectWithValue }) => {
    try {
      return await sendOrder(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
