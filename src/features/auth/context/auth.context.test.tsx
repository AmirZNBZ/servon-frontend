import { describe, expect, vi } from "vitest";
import { authApi } from "../api/auth.api";
import { act, render, renderHook, waitFor } from "@testing-library/react";
import { AuthProvider } from "./auth.context";
import { useAuth } from "../hooks/useAuth";

vi.mock("../api/auth.api", () => ({
  authApi: {
    me: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  },
}));

describe("AuthContext", () => {
  it("bootstraps user on mount", async () => {
    (authApi.me as any).mockResolvedValue({
      data: { userId: "test@test.com" },
    });

    render(
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(authApi.me).toHaveBeenCalled();
    });
  });

  it("logs in user correctly", async () => {
    (authApi.login as any).mockResolvedValue({
      data: { accessToken: "token" },
    });

    (authApi.me() as any).mockResolvedValue({
      data: { userId: "amir@amir.com" },
    });

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.login("amir@amir.com", "asdf@1234");
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.userId).toBe("amir@amir.com");
  });

  it("logs out user correctly", async () => {
    (authApi.logout as any).mockResolvedValue({});

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
