export function getActualPrice(product) {
  if (
    product &&
    product.discountPrice !== null &&
    product.discountPrice !== undefined &&
    product.discountPrice < product.price
  ) {
    return product.discountPrice;
  }

  return product?.price ?? 0;
}
