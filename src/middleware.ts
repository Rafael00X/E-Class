import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  decodeJwt,
  deleteCookieInNextResponse,
  getTokenFromCookieInNextRequest,
} from "./modules/server/auth";

export default async function middleware(req: NextRequest) {
  const token = getTokenFromCookieInNextRequest(req);
  let user: User | null = null;
  let res: NextResponse;

  // Get user from token
  if (token) user = await decodeJwt(token);

  // Not authorized due to missing jwt token, send to '/signup'
  // Not authorized due to invalid jwt token, delete cookie and send to '/signup'
  if (!user) {
    if (req.nextUrl.pathname.startsWith("/signup")) res = NextResponse.next();
    else res = NextResponse.redirect(new URL("/signup", req.url));

    if (token) deleteCookieInNextResponse(res);
    return res;
  }

  // Copy headers and add userId to it
  const headers = new Headers(req.headers);
  headers.set("user_id", user.id);

  // Authorized, redirect to home page if trying to go to '/signup'
  if (req.nextUrl.pathname.startsWith("/signup"))
    res = NextResponse.redirect(new URL("/", req.url));
  else res = NextResponse.next({ request: { headers } });

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
