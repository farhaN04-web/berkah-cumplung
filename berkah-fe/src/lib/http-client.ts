import Cookies from "js-cookie";
import * as jose from "jose";
import { Session } from "@/types/session";

interface ApiError extends Error {
  status: number;
  statusText: string;
}

class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_BASE_URL}/v1`;
  }

  private async getToken(): Promise<string | null> {
    try {
      const sessionToken = Cookies.get("APP_SESSION");
      if (!sessionToken) return null;

      const getSecretKey = () => {
        return new TextEncoder().encode(
          import.meta.env.VITE_SECRET_KEY || "fallback-secret-key",
        );
      };

      const { payload } = await jose.jwtVerify(sessionToken, getSecretKey(), {
        algorithms: ["HS256"],
      });

      if (payload?.session) {
        const sessionData = payload.session as Session;
        return sessionData.token;
      }

      return null;
    } catch (error) {
      console.error("Failed to get token:", error);
      // Clear invalid session
      Cookies.remove("APP_SESSION");
      return null;
    }
  }

  private async createHeaders(
    customHeaders: HeadersInit = {},
    body?: unknown,
  ): Promise<Headers> {
    const headers = new Headers(customHeaders);

    // Don't set Content-Type for FormData - let browser handle it with boundary
    if (!(body instanceof FormData)) {
      // Set default content type if not already set and not FormData
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }

    // Add authorization header if token exists
    const token = await this.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        Cookies.remove("APP_SESSION");
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }

      let errorBody: Record<string, unknown>;
      try {
        errorBody = await response.clone().json();
      } catch {
        try {
          errorBody = { message: await response.clone().text() };
        } catch {
          errorBody = {};
        }
      }

      const errorMessage =
        errorBody?.message || errorBody?.error || response.statusText;

      const error = new Error(`${errorMessage}`) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text() as Promise<T>;
  }

  /**
   * Get request
   * @param endpoint - The endpoint to fetch
   * @param options - The options for the request
   * @returns The response from the request
   */
  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.createHeaders(options.headers);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      ...options,
      headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Post request
   * @param endpoint - The endpoint to fetch
   * @param data - The data to send
   * @param options - The options for the request
   * @returns The response from the request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = await this.createHeaders(options.headers, data);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: data
        ? data instanceof FormData
          ? data
          : JSON.stringify(data)
        : undefined,
      ...options,
      headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Put request
   * @param endpoint - The endpoint to fetch
   * @param data - The data to send
   * @param options - The options for the request
   * @returns The response from the request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = await this.createHeaders(options.headers, data);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: data
        ? data instanceof FormData
          ? data
          : JSON.stringify(data)
        : undefined,
      ...options,
      headers,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * Delete request
   * @param endpoint - The endpoint to fetch
   * @param options - The options for the request
   * @returns The response from the request
   */
  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.createHeaders(options.headers);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      ...options,
      headers,
    });

    return this.handleResponse<T>(response);
  }
}

export const httpClient = new HttpClient();
