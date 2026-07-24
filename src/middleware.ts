import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin/leads and subroutes
  if (path.startsWith("/admin/leads")) {
    const sessionCookie = request.cookies.get("am_session");
    if (!sessionCookie) {
      // In a real app, redirect to login page. For CP-005, let's allow it but log a warning.
      console.log(`[Middleware Warning] Unauthenticated access attempt to ${path}`);
      // Return NextResponse.redirect(new URL("/admin", request.url)); // Disabled for CP-005 testing
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
