import { getActualPrice } from "../../../shared/lib/getActualPrice";

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + getActualPrice(item) * item.quantity,
    0,
  );
