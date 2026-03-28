import { PRODUCTS } from '../data/products.js';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3001';
const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

function getErrorMessage(error, fallbackMessage = 'Something went wrong. Please try again.') {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

async function request(url = PRODUCTS_API_URL, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to connect to the server.'));
  }
}

export async function fetchProducts(params = {}) {
  return request(`${PRODUCTS_API_URL}${buildQueryString(params)}`);
}

export async function getProducts(params = {}) {
  try {
    return await fetchProducts(params);
  } catch (error) {
    console.error('Falling back to static products:', error);
    return {
      products: PRODUCTS,
      pagination: {
        page: 1,
        limit: PRODUCTS.length,
        total: PRODUCTS.length,
        totalPages: 1,
      },
      error: getErrorMessage(error, 'Error loading products.'),
    };
  }
}

export async function createProduct(product) {
  return request(PRODUCTS_API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  return request(`${PRODUCTS_API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  return request(`${PRODUCTS_API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function getRecommendedProducts(id) {
  return request(`${PRODUCTS_API_URL}/recommend/${id}`);
}

export async function getProfileRecommendations(payload) {
  return request(`${API_BASE_URL}/api/recommend`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
