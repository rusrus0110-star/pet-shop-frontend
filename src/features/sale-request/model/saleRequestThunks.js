import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendSaleRequest } from "../../../shared/api/saleApi";

export const submitSaleRequest = createAsyncThunk(
  "saleRequest/submitSaleRequest",
  async (payload, { rejectWithValue }) => {
    try {
      return await sendSaleRequest(payload);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
