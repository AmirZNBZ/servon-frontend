import { http } from "@/src/lib/http";
import { describe, expect, it, vi } from "vitest";
import { authApi } from "./auth.api";

vi.mock("@/lib/http", () => ({
  http: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("authApi", () => {
  it("calls login api correctly", async () => {
    (http.post as any).mockResolveValue({
      data: { accessToken: "token" },
    });

    const res = await authApi.login({
      email: "amir@amir.com",
      password: "asdf@1234",
    });

    expect(http.post).toHaveBeenCalledWith("/auth/login", {
      email: "amir@amir.com",
      password: "asdf@1234",
    });

    expect(res.data.accessToken).toBe("token");
  });

  it("calls me API correctly", async () => {
    (http.get as any).mockResolveValue({
      data: { userId: "amir@amir.com" },
    });

    const res = await authApi.me();

    expect(http.get).toHaveBeenCalledWith("/auth/me");
    expect(res.data.userId).toBe("amir@amir.com");
  });
});
