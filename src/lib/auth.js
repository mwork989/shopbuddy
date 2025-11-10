
// auth helpers

import jwt from "jsonwebtoken";

const COOKIE_NAME = "sb_auth";
const ROLES = { USER: "user", ADMIN: "admin" };
export { COOKIE_NAME, ROLES };

// registeration
export function signJWT(payload) {
  const secret = process.env.JWT_SECRET || "dev_secret";
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

// on going verification
export function verifyJWT(token) {
  try {
    const secret = process.env.JWT_SECRET || "dev_secret";
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function parseCookie(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => c.trim().split("="))
  );
}

export function getUserFromRequest(req) {
  const cookie = req.headers.get("cookie") || "";
  const jar = parseCookie(cookie);
  const token = jar[COOKIE_NAME];
  return token ? verifyJWT(token) : null;
}
