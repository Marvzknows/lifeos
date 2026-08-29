import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { createClient } from "@/lib/supabase/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

// Shape we expect our own API's error responses to follow
interface ApiErrorResponseBody {
  message?: string;
  code?: string;
  details?: unknown;
}

function normalizeError(error: AxiosError<ApiErrorResponseBody>): ApiError {
  if (error.response) {
    const data = error.response.data;
    return {
      message: data?.message ?? error.message,
      status: error.response.status,
      code: data?.code,
      details: data?.details,
    };
  }
  if (error.request) {
    return { message: "No response from server. Check your connection." };
  }
  return { message: error.message };
}

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // attaching access token
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Handle 401 globally (token expired)
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponseBody>) => {
      const isMeEndpoint = error.config?.url?.includes("/me");

      if (error.response?.status === 401 && !isMeEndpoint) {
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          const supabase = createClient();
          await supabase.auth.signOut();
          window.location.href = "/login";
        }
      }
      return Promise.reject(normalizeError(error));
    },
  );

  return instance;
}

export const apiClient = createApiClient();
