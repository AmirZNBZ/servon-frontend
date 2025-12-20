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

let queue: Array<(token: string) => void> = [];
http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(http(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await http.post("/auth/refresh");
        const newToken = res.data.accessToken;

        tokenStore.set(newToken);
        isRefreshing = false;

        queue.forEach((cb) => cb(newToken));
        queue = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return http(originalRequest);
      } catch (err) {
        tokenStore.clear();
        isRefreshing = false;
        queue = [];
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
