import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../../../entities/category/model/categoriesSlice";
import productsReducer from "../../../entities/product/model/productsSlice";
import cartReducer from "../../../features/cart/model/cartSlice";
import filtersReducer from "../../../features/filters/model/filtersSlice";
import orderReducer from "../../../features/order/model/orderSlice";
import saleRequestReducer from "../../../features/sale-request/model/saleRequestSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    filters: filtersReducer,
    order: orderReducer,
    saleRequest: saleRequestReducer,
  },
  devTools: import.meta.env.DEV,
});
