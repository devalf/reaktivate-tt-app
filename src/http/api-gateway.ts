import { API_BASE } from '../config/api';

export default class ApiGateway {
  async get<T = unknown>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`);

    if (!response.ok) {
      throw new Error(`GET ${path} failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  async post<T = unknown>(path: string, payload: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`POST ${path} failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }
}
