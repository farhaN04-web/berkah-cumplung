import { useSession } from "@/hooks/useSession";
import { useCallback } from "react";

/**
 * Alternative approach: Hook that provides authenticated request capabilities
 * Use this if you need more granular control over authentication in specific components
 */
export function useAuthenticatedRequest() {
  const { session } = useSession();

  const makeRequest = useCallback(
    async <T>(url: string, options: RequestInit = {}): Promise<T> => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const headers = new Headers(options.headers);

      // Add authorization header if session exists
      if (session?.token) {
        headers.set("Authorization", `Bearer ${session.token}`);
      }

      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [session?.token],
  );

  return {
    makeRequest,
    isAuthenticated: !!session?.token,
    token: session?.token,
  };
}
