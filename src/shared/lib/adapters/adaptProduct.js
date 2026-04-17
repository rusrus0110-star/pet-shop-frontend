export function adaptProduct(product) {
  return {
    id: Number(product.id),
    title: product.title ?? "",
    price: Number(product.price) || 0,
    discountPrice:
      product.discont_price !== null && product.discont_price !== undefined
        ? Number(product.discont_price)
        : null,
    description: product.description ?? "",
    image: product.image ?? "",
    categoryId: product.categoryId ? Number(product.categoryId) : null,
  };
}
