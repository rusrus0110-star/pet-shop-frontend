import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../../../features/cart/model/cartSlice";
import { filtersReducer } from "../../../features/filters/model/filtersSlice";
import orderReducer from "../../../features/order/model/orderSlice";
import saleRequestReducer from "../../../features/sale-request/model/saleRequestSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    order: orderReducer,
    saleRequest: saleRequestReducer,
  },
  devTools: import.meta.env.DEV,
});
