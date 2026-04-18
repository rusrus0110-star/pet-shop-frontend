import axios from "axios";
import { API_BASE_URL } from "../config/env";

export async function getSaleProducts() {
  const response = await axios.get(`${API_BASE_URL}/products/all`);

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid products response format");
  }

  return response.data.filter(
    (item) => item.discont_price !== null && Number(item.discont_price) > 0,
  );
}
