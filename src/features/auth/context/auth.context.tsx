"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.api";
import { tokenStore } from "../token";

interface AuthContextValue {
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  user: { userId: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ userId: string } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    authApi
      .me()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    tokenStore.set(res.data.accessToken);

    const me = await authApi.me();
    setUser(me.data);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await authApi.register({ email, password });
    console.log("res", res);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    tokenStore.clear();
    setUser(null);
  }, []);

  const values = useMemo(() => {
    return { user, login, logout, isLoading, isAuthenticated, register };
  }, [isAuthenticated, isLoading, login, logout, user, register]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");

  return ctx;
};
