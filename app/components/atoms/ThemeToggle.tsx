"use client";

import { useTransition } from "react";
import { Button } from "./Button";

export default function ThemeToggle() {
  const [, startTransition] = useTransition();

  function toggleTheme() {
    startTransition(async () => {
      const res = await fetch("/api/theme", { method: "POST" });
      const { theme } = (await res.json()) as { theme: "light" | "dark" };

      document.documentElement.setAttribute("data-theme", theme);
    });
  }

  return (
    <Button variant="outline" onClick={toggleTheme}>
      Toggle theme
    </Button>
  );
}
