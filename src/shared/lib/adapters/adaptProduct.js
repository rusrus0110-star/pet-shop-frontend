export function adaptProduct(item) {
  return {
    id: Number(item.id),
    title: item.title ?? "",
    description: item.description ?? "",
    image: item.image ?? "",
    price: Number(item.price) || 0,
    discountPrice:
      item.discont_price === null || item.discont_price === undefined
        ? null
        : Number(item.discont_price),
    categoryId:
      item.categoryId === null || item.categoryId === undefined
        ? null
        : Number(item.categoryId),
  };
}
