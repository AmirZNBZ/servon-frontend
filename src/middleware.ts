import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

  if (!isProtected) NextResponse.next();

  const refreshToken = request.cookies.get("refreshToken");

  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
