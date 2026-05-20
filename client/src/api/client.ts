import type { CreateEventInput, EventMeta, FanEvent } from '../types/event';

const BASE = import.meta.env.VITE_API_URL ?? '/api/v1/events';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    ...options
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((data as { error?: string }).error ?? `HTTP ${response.status}`);
  }

  return data as T;
}

export const eventApi = {
  getMeta(): Promise<EventMeta> {
    return request(`${BASE}/meta`);
  },

  getFeatured(): Promise<FanEvent> {
    return request(`${BASE}/featured`);
  },

  getAll(params?: { type?: string; tourName?: string; upcoming?: boolean }): Promise<FanEvent[]> {
    const qs = new URLSearchParams();
    if (params?.type) qs.set('type', params.type);
    if (params?.tourName) qs.set('tourName', params.tourName);
    if (params?.upcoming) qs.set('upcoming', 'true');
    const query = qs.toString();
    return request(`${query ? `${BASE}?${query}` : BASE}`);
  },

  getById(id: string): Promise<FanEvent> {
    return request(`${BASE}/${id}`);
  },

  create(input: Partial<CreateEventInput>): Promise<FanEvent> {
    return request(BASE, { method: 'POST', body: JSON.stringify(input) });
  },

  patch(id: string, input: Partial<CreateEventInput>): Promise<FanEvent> {
    return request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(input) });
  },

  remove(id: string): Promise<void> {
    return request(`${BASE}/${id}`, { method: 'DELETE' });
  }
};
