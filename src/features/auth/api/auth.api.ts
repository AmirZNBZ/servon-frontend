import { http } from "@/src/lib/http";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface MeResponse {
  userId: string;
}

export const authApi = {
  login(payload: LoginPayload) {
    return http.post<LoginResponse>("/auth/login", payload);
  },

  register(payload: LoginPayload) {
    return http.post<LoginResponse>("/auth/register", payload);
  },

  me() {
    return http.get<MeResponse>("/auth/me");
  },

  logout() {
    return http.post("/auth/logout");
  },
};
