
const BASE_URL = 'http://164.68.121.216:8089/api/v1';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('accessToken');
  const isPublic = endpoint.startsWith('/system/') && options.method === 'GET' || endpoint.startsWith('/auth/');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...((token && !isPublic) ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data.data;
}
