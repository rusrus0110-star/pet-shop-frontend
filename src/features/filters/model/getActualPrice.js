export function getActualPrice(product) {
  const hasDiscount =
    product.discountPrice !== null &&
    product.discountPrice !== undefined &&
    Number(product.discountPrice) > 0;

  return hasDiscount
    ? Number(product.discountPrice)
    : Number(product.price) || 0;
}
