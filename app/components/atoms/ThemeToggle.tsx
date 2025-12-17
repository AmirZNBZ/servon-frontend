"use client";

import { useTransition } from "react";
import { Button } from "./Button";
import { Theme } from "@/app/types/globalTypes";

export default function ThemeToggle() {
  const [, startTransition] = useTransition();

  function toggleTheme() {
    startTransition(async () => {
      const res = await fetch("/api/theme", { method: "POST" });
      const { theme } = (await res.json()) as { theme: Theme };

      document.documentElement.setAttribute("data-theme", theme);
    });
  }

  return (
    <Button variant="outline" onClick={toggleTheme}>
      Toggle theme
    </Button>
  );
}
