"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";
import { tokenStore } from "../token";
import { AuthStatus, User } from "../types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  status: AuthStatus;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await authApi.me();
        setUser(res.data);
        setStatus("authenticated");
      } catch {
        tokenStore.clear();
        setUser(null);
        setStatus("unauthenticated");
      }
    };

    bootstrap();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    tokenStore.set(res.data.accessToken);

    const me = await authApi.me();
    setUser(me.data);
    setStatus("authenticated");
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await authApi.register({ email, password });
    console.log("res", res);
    return res.data.message;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    tokenStore.clear();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const values = useMemo(() => {
    return {
      user,
      status,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      login,
      logout,
      register,
    };
  }, [user, status, login, logout, register]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");

  return ctx;
};
