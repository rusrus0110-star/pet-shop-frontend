import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: "",
  maxPrice: "",
  discountedOnly: false,
  sortBy: "by-default",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },

    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },

    setDiscountedOnly(state, action) {
      state.discountedOnly = action.payload;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setFilters(state, action) {
      const {
        minPrice = state.minPrice,
        maxPrice = state.maxPrice,
        discountedOnly = state.discountedOnly,
        sortBy = state.sortBy,
      } = action.payload ?? {};

      state.minPrice = minPrice;
      state.maxPrice = maxPrice;
      state.discountedOnly = discountedOnly;
      state.sortBy = sortBy;
    },

    resetFilters(state) {
      state.minPrice = "";
      state.maxPrice = "";
      state.discountedOnly = false;
      state.sortBy = "by-default";
    },
  },
});

export const {
  setMinPrice,
  setMaxPrice,
  setDiscountedOnly,
  setSortBy,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

export default filtersSlice.reducer;
