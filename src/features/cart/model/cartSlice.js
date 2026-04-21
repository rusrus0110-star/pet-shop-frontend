import { createSlice } from "@reduxjs/toolkit";

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeCartProduct(product, quantity = 1) {
  if (!product || typeof product !== "object") {
    throw new Error("Invalid product payload for cart.");
  }

  const productId = toNumber(product.id, null);

  if (productId === null) {
    throw new Error("Product id is required for cart.");
  }

  const rawDiscountPrice =
    product.discountPrice ?? product.discont_price ?? null;

  const normalizedDiscountPrice =
    rawDiscountPrice === null || rawDiscountPrice === undefined
      ? null
      : toNumber(rawDiscountPrice, null);

  return {
    id: productId,
    title: product.title ?? "",
    price: toNumber(product.price, 0),
    discountPrice: normalizedDiscountPrice,
    image: product.image ?? "",
    quantity: Math.max(1, toNumber(quantity, 1)),
  };
}

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      try {
        const payload = action.payload ?? {};
        const product = payload.product ?? payload;
        const quantity = payload.quantity ?? 1;

        const normalizedProduct = normalizeCartProduct(product, quantity);

        const existingItem = state.items.find(
          (item) => item.id === normalizedProduct.id,
        );

        if (existingItem) {
          existingItem.quantity += normalizedProduct.quantity;
          return;
        }

        state.items.push(normalizedProduct);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    },

    incrementItemQuantity: (state, action) => {
      const productId = toNumber(action.payload, null);

      if (productId === null) {
        return;
      }

      const item = state.items.find((cartItem) => cartItem.id === productId);

      if (item) {
        item.quantity += 1;
      }
    },

    decrementItemQuantity: (state, action) => {
      const productId = toNumber(action.payload, null);

      if (productId === null) {
        return;
      }

      const item = state.items.find((cartItem) => cartItem.id === productId);

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
        return;
      }

      state.items = state.items.filter((cartItem) => cartItem.id !== productId);
    },

    removeItem: (state, action) => {
      const productId = toNumber(action.payload, null);

      if (productId === null) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== productId);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
