import { NextResponse } from "next/server";
import { signJWT, COOKIE_NAME, ROLES } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  const users = {
    "admin@demo.dev": { id: 1, name: "Admin", role: ROLES.ADMIN },
    "user@demo.dev": { id: 2, name: "User", role: ROLES.USER },
  };
  const user = users[email];
  const ok = !!user && password === "pass123";
  if (!ok)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signJWT({
    sub: user.id,
    name: user.name,
    role: user.role,
    email,
  });
  const res = NextResponse.json({ ok: true, user });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
