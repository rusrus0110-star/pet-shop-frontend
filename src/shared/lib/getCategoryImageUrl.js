import { API_BASE_URL } from "../config/env";

export function getCategoryImageUrl(image) {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/category_img/")) {
    return `${API_BASE_URL}${image}`;
  }

  if (image.startsWith("category_img/")) {
    return `${API_BASE_URL}/${image}`;
  }

  return `${API_BASE_URL}/category_img/${image}`;
}
