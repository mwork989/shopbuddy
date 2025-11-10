import { NextResponse } from "next/server";
import { COOKIE_NAME, ROLES } from "@/lib/auth";

import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev_secret");
async function verifyOnEdge(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isDashboard = /^\/[^/]+\/dashboard(?:\/|$)/.test(pathname);
  if (!isDashboard) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? await verifyOnEdge(token) : null;

  if (!user || user.role !== ROLES.ADMIN) {
    const url = req.nextUrl.clone();
    const locale = pathname.split("/")[1] || "en";
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:locale/dashboard/:path*"],
};
