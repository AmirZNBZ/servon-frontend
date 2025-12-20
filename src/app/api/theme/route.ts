import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const current = cookieStore.get("theme")?.value ?? "light";

  const next = current === "light" ? "dark" : "light";

  cookieStore.set("theme", next, {
    path: "/",
  });

  return NextResponse.json({ theme: next });
}
