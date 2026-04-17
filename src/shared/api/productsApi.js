import { axiosInstance } from "./axiosInstance";
import { adaptProduct } from "../lib/adapters/adaptProduct";
import { isBackendError } from "../lib/isBackendError";

export async function getAllProducts() {
  const response = await axiosInstance.get("/products/all");
  const data = response.data;

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response format");
  }

  return data.map(adaptProduct);
}

export async function getProductById(productId) {
  const response = await axiosInstance.get(`/products/${productId}`);
  const data = response.data;

  if (isBackendError(data)) {
    throw new Error(data.message || "Failed to load product");
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Product not found");
  }

  return adaptProduct(data[0]);
}
