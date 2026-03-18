import { getAuthToken } from '../utils/authToken.js';

export async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const token = getAuthToken();
  let res;

  try {
    res = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    const err = new Error('Unable to reach the server. Please check that the API is running.');
    err.cause = error;
    throw err;
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const msg =
      (isJson ? data?.error : data) ||
      `Request failed: ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
