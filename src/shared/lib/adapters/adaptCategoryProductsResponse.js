import { adaptCategory } from "./adaptCategory";
import { adaptProduct } from "./adaptProduct";

export function adaptCategoryProductsResponse(data) {
  return {
    category: adaptCategory(data.category),
    products: Array.isArray(data.data) ? data.data.map(adaptProduct) : [],
  };
}
