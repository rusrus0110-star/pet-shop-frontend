import { axiosInstance } from "./axiosInstance";
import { isBackendError } from "../lib/isBackendError";

export async function sendOrder(payload) {
  const response = await axiosInstance.post("/order/send", payload);
  const data = response.data;

  if (isBackendError(data)) {
    throw new Error(data.message || "Failed to send order");
  }

  return data;
}
