import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ theme: "dark" }),
    } as Response);
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", {
        name: /toggle/i,
      })
    ).toBeInTheDocument();
  });

  it("calls theme API on click", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button"));

    expect(global.fetch).toHaveBeenCalledWith("/api/theme", {
      method: "POST",
    });
  });

  it("updates document theme immediately", async () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button"));

    await new Promise(process.nextTick);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
