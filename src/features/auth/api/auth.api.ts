import { http } from "@/src/lib/http";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
export interface RegisterResponse {
  message: string;
}

export interface MeResponse {
  userId: string;
}

export const authApi = {
  login(payload: LoginPayload) {
    return http.post<LoginResponse>("/auth/login", payload);
  },

  register(payload: LoginPayload) {
    return http.post<RegisterResponse>("/auth/register", payload);
  },

  me() {
    return http.get<MeResponse>("/auth/me");
  },

  logout() {
    return http.post("/auth/logout");
  },
};
