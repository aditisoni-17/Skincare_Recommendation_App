import { apiFetch } from './apiClient.js';

export async function getProducts() {
  return apiFetch('/api/products');
}

