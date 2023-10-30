import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware is a function that you can attach
// to routes in order for it to run before the request completes.
// In other words, it runs in "the middle."
// This is useful for things like checking
//if a user is authenticated or has the proper roles to access a route.
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // We need to tell Next.js both the URL to display and the URL to prefetch
    // when rewriting the user to a different page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

// Limit the middleware to the following paths
export const config = {
  matcher: ["/", "/networkelement", "/netconf", "/signin", "/signup"],
};
