import axios from "axios";
import { API_BASE_URL } from "../config/env";

export async function sendSaleRequest(payload) {
  const response = await axios.post(`${API_BASE_URL}/sale/send`, payload);
  return response.data;
}
