const API_BASE_URL = "http://localhost:3333";

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = "Request failed";

    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      // ignore json parse error
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getAllCategories() {
  const response = await fetch(`${API_BASE_URL}/categories/all`);
  return handleResponse(response);
}

export async function getCategoryWithProducts(categoryId) {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
  return handleResponse(response);
}
