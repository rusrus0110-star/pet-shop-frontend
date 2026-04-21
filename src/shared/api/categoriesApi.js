const API_BASE_URL = "http://localhost:3333";

import { axiosInstance } from "./axiosInstance";

export async function getAllCategories() {
  const response = await axiosInstance.get("/categories/all");
  return response.data;
}

export async function getCategoryById(categoryId) {
  const response = await axiosInstance.get(`/categories/${categoryId}`);
  return response.data;
}

export async function getCategoryWithProducts(categoryId) {
  const response = await axiosInstance.get(`/categories/${categoryId}`);
  return response.data;
}
