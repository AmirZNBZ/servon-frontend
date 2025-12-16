import React from "react";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const theme = cookiesStore.get("theme")?.value ?? "light";
  console.log("theme", theme)
  return (
    <html lang="fa" data-theme={theme}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
