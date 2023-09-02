import type { z } from "zod";

export type ClientConfig<T> = {
  data?: unknown;
  zodSchema?: z.ZodSchema<T>;
  method?: "DELETE" | "GET" | "OPTIONS" | "PATCH" | "POST" | "PUT";
  headers?: HeadersInit;
  customConfig?: RequestInit;
  signal?: AbortSignal;
};

export const client = async <T>(
  url: string,
  {
    data,
    zodSchema,
    method,
    headers: customHeaders,
    signal,
    customConfig,
  }: ClientConfig<T> = {}
): Promise<T> => {
  const config: RequestInit = {
    method: method ?? (data ? "POST" : "GET"),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": data ? "application/json" : "",
      Accept: "application/json",
      ...customHeaders,
    },
    signal,
    ...customConfig,
  };

  return fetch(url, config).then(async (response) => {
    // on gères le status 401
    if (response.status === 401) {
      throw new Error("You're not authenticated");
    }

    let result;
    try {
      result = response.status === 204 ? undefined : await response.json();
    } catch (error: unknown) {
      return Promise.reject(error);
    }

    if (response.ok) {
      return zodSchema && result ? zodSchema.parse(result) : result;
    } else {
      return Promise.reject(result);
    }
  });
};
