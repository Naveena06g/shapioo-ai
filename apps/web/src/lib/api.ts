// If VITE_API_URL is set in production, use it. Otherwise, use localhost.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // ... (keep the rest of the file exactly the same)
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Something went wrong");
  }
  return res.json();
}