import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/app")) {
    const sessionCookie = request.cookies.get("drishyam_session");
    const loggedOut = request.cookies.get("drishyam_logged_out");
    if (!sessionCookie || !sessionCookie.value) {
      if (loggedOut?.value === "1") {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }
      const response = NextResponse.next();
      response.cookies.set("drishyam_session", "demo_token", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
