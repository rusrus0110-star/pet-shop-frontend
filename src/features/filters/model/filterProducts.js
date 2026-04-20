import { getActualPrice } from "./getActualPrice";

export function filterProducts(products, filters) {
  const { priceFrom, priceTo, discountOnly, sortValue } = filters;

  const from = priceFrom === "" ? null : Number(priceFrom);
  const to = priceTo === "" ? null : Number(priceTo);

  let result = [...products];

  if (discountOnly) {
    result = result.filter((product) => {
      return (
        product.discountPrice !== null &&
        product.discountPrice !== undefined &&
        Number(product.discountPrice) > 0
      );
    });
  }

  result = result.filter((product) => {
    const actualPrice = getActualPrice(product);

    if (from !== null && actualPrice < from) {
      return false;
    }

    if (to !== null && actualPrice > to) {
      return false;
    }

    return true;
  });

  switch (sortValue) {
    case "price-high-low":
      result.sort((a, b) => getActualPrice(b) - getActualPrice(a));
      break;

    case "price-low-high":
      result.sort((a, b) => getActualPrice(a) - getActualPrice(b));
      break;

    case "default":
    default:
      break;
  }

  return result;
}
