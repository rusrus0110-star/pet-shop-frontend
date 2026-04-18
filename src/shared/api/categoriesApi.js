import axios from "axios";
import { API_BASE_URL } from "../config/env";

export async function getAllCategories() {
  const response = await axios.get(`${API_BASE_URL}/categories/all`);

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid categories response format");
  }

  return response.data;
}
