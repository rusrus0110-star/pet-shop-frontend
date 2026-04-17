export function adaptCategory(category) {
  return {
    id: Number(category.id),
    title: category.title ?? "",
    image: category.image ?? "",
  };
}
