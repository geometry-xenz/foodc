import { redirect } from "next/navigation";

export class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;

  constructor(status: number, message: string, code?: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

const API_ORIGIN =
  process.env.API_ORIGIN ||
  process.env.NEXT_PUBLIC_API_ORIGIN ||
  (process.env.PORT ? `http://127.0.0.1:${process.env.PORT}` : "http://127.0.0.1:3000");

interface FetchOptions extends RequestInit {
  redirectOn401?: boolean;
}

export async function apiFetch<T = any>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { redirectOn401 = true, headers: customHeaders = {}, ...rest } = options;
  const isServer = typeof window === "undefined";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  let url: string;
  const headers = new Headers(customHeaders);

  if (isServer) {
    url = `${API_ORIGIN}${normalizedPath}`;
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get("drishyam_session");
      if (sessionCookie) {
        headers.set("Cookie", `drishyam_session=${sessionCookie.value}`);
      }
    } catch {
      // In non-request context (e.g. build time static evaluation), ignore
    }
  } else {
    // Client-side: use relative URL so Next.js rewrites it same-origin
    url = normalizedPath;
  }

  if (!headers.has("Content-Type") && !(rest.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...rest,
    headers,
    credentials: "include",
    cache: rest.cache || "no-store",
  });

  if (response.status === 401) {
    if (redirectOn401) {
      if (isServer) {
        redirect("/login");
      } else {
        window.location.href = "/login";
      }
    }
    throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
  }

  if (!response.ok) {
    let errorData: any = null;
    let message = `API request failed with status ${response.status}`;
    let code: string | undefined = undefined;

    try {
      errorData = await response.json();
      if (errorData?.detail) {
        if (typeof errorData.detail === "string") {
          message = errorData.detail;
        } else if (errorData.detail?.message) {
          message = errorData.detail.message;
          code = errorData.detail.code;
        }
      } else if (errorData?.error?.message) {
        message = errorData.error.message;
        code = errorData.error.code;
      }
    } catch {
      // Body not JSON
    }

    throw new ApiError(response.status, message, code, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as unknown as T;
}

export const api = {
  get: <T = any>(path: string, options?: FetchOptions) =>
    apiFetch<T>(path, { ...options, method: "GET" }),

  post: <T = any>(path: string, body?: unknown, options?: FetchOptions) =>
    apiFetch<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(path: string, body?: unknown, options?: FetchOptions) =>
    apiFetch<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(path: string, options?: FetchOptions) =>
    apiFetch<T>(path, { ...options, method: "DELETE" }),
};

export async function getSessionUser() {
  try {
    const res = await apiFetch<any>("/api/auth/me", { redirectOn401: false });
    return res?.user || (res?.id ? res : null);
  } catch {
    return null;
  }
}
