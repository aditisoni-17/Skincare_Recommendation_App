import { apiFetch } from './apiClient.js';

export async function signup(payload) {
  return apiFetch('/api/auth/signup', { method: 'POST', body: payload });
}

export async function login(payload) {
  return apiFetch('/api/auth/login', { method: 'POST', body: payload });
}

