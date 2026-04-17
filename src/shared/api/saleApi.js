import { axiosInstance } from "./axiosInstance";
import { isBackendError } from "../lib/isBackendError";

export async function sendSaleRequest(payload) {
  const response = await axiosInstance.post("/sale/send", payload);
  const data = response.data;

  if (isBackendError(data)) {
    throw new Error(data.message || "Failed to send discount request");
  }

  return data;
}
