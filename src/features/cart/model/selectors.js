export function selectCartItems(state) {
  return state.cart?.items ?? [];
}

export function selectCartTotalQuantity(state) {
  return selectCartItems(state).reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );
}

export function selectCartItemById(state, productId) {
  return selectCartItems(state).find(
    (item) => Number(item.id) === Number(productId),
  );
}
