export function calculateDiscountPercent(price, discountPrice) {
  const original = Number(price);
  const discounted = Number(discountPrice);

  if (!original || !discounted || discounted >= original) {
    return 0;
  }

  return Math.round(((original - discounted) / original) * 100);
}
