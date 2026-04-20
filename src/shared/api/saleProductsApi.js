import { axiosInstance } from "./axiosInstance";
import { adaptProduct } from "../lib/adapters/adaptProduct";

export async function getSaleProducts() {
  const response = await axiosInstance.get("/products/all");
  const data = response.data;

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response format");
  }

  return data
    .filter(
      (item) => item.discont_price !== null && Number(item.discont_price) > 0,
    )
    .map(adaptProduct);
}
