import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

const replaceMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

vi.mock("@/src/features/auth/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("ProtectRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when auth is loading", () => {
    (useAuth as any).mockReturnValue({
      user: null,
      isLoading: true,
    });

    render(
      <ProtectedRoute>
        <div>Private Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Checking Authentication...")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("redirects to /login when unauthenticated", async () => {
    (useAuth as any).mockReturnValue({
      user: null,
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <div>Private Content</div>
      </ProtectedRoute>
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/login");
    });
  });

  it("renders children when authenticated", () => {
    (useAuth as any).mockReturnValue({
      user: { id: "1", email: "test@test.com" },
      isLoading: false,
    });

    render(
      <ProtectedRoute>
        <div>Private Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Private Content")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
