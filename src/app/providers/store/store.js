import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../../../features/cart/model/cartSlice";
import { filtersReducer } from "../../../features/filters/model/filtersSlice";
import orderReducer from "../../../features/order/model/orderSlice";
import saleRequestReducer from "../../../features/sale-request/model/saleRequestSlice";

const CART_STORAGE_KEY = "pet-shop-cart";

function loadCartState() {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!serializedCart) {
      return undefined;
    }

    const parsedCart = JSON.parse(serializedCart);

    if (
      !parsedCart ||
      typeof parsedCart !== "object" ||
      !Array.isArray(parsedCart.items)
    ) {
      return undefined;
    }

    return {
      cart: parsedCart,
    };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return undefined;
  }
}

function saveCartState(cartState) {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    order: orderReducer,
    saleRequest: saleRequestReducer,
  },
  preloadedState: loadCartState(),
  devTools: import.meta.env.DEV,
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
