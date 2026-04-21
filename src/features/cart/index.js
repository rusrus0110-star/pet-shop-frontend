export {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
  clearCart,
} from "./model/cartSlice";

export {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartItemById,
} from "./model/selectors";

export { default as cartReducer } from "./model/cartSlice";
