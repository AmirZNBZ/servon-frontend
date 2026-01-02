import axios from "axios";
import { tokenStore } from "../features/auth/token";

export const http = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, //  for refresh in cookie
});

http.interceptors.request.use((config) => {
  const token = tokenStore.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401 = error.response?.status === 401;
    const isRefreshingRequest = originalRequest.url?.includes("/auth/refresh");

    if (is401 && isRefreshingRequest) {
      tokenStore.clear();
      return Promise.reject(error);
    }

    if (is401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(http(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        const res = await http.post("/auth/refresh");
        const newToken = res.data.accessToken;

        tokenStore.set(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest);
      } catch (error) {
        processQueue(error, null);
        tokenStore.clear();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
