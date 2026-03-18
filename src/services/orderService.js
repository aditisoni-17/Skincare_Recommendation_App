import { apiFetch } from './apiClient.js';

export async function createOrder(payload) {
  return apiFetch('/api/orders', { method: 'POST', body: payload });
}

export async function getOrders() {
  return apiFetch('/api/orders');
}

