import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken, AM_COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const sessionCookie = request.cookies.get(AM_COOKIE_NAME)?.value;

  let isValidSession = false;
  if (sessionCookie) {
    const payload = await verifyAdminToken(sessionCookie);
    if (payload) {
      isValidSession = true;
    }
  }

  // 1. Protect /admin/leads and /api/admin/leads
  if (path.startsWith("/admin/leads") || path.startsWith("/api/admin/leads")) {
    if (!isValidSession) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
      }
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Redirect logged-in AM user away from /admin (login page) to /admin/leads
  if (path === "/admin" || path === "/admin/") {
    if (isValidSession) {
      const dashboardUrl = new URL("/admin/leads", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
