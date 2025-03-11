// import type { NextRequest } from "next/server"

// import { auth0 } from "./app/lib/auth0"

// export async function middleware(request: NextRequest) {
//   return await auth0.middleware(request)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// }

import { NextResponse } from "next/server";

export function middleware(req:any) {
  // Get the session cookie manually
  const sessionCookie = req.cookies.get("auth0.session")?.value; 

  // If user is logged in and on the root page, redirect to /home
  if (sessionCookie && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

// Only apply middleware on the home page ("/")
export const config = {
  matcher: "/",
};
