import { authClient } from "@/lib/auth-client";
import { API_URL } from "@/lib/events";

// Calls the Express server with the logged-in user's JWT attached
export async function authFetch(path: string, options: RequestInit = {}) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${data.token}`,
    },
  });
}