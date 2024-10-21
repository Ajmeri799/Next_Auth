import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authService from "@/appwrite/auth";

// Middleware to protect routes
export async function middleware(request: NextRequest) {
  const user = await authService.getCurrentUser();
  const { pathname } = request.nextUrl;

  // If the user is authenticated, don't redirect them to login
  if (user && pathname === "/Login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is NOT authenticated and trying to access protected pages
  if (!user && pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/Login"], // Add the paths you want to protect
};
