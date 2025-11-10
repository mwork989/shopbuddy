import { NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/db";
import { getUserFromRequest, ROLES } from "@/lib/auth";

export const revalidate = 60; // ISR every 60 seconds for GET

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(req) {
  const user = getUserFromRequest(req);
  if (!user || user.role !== ROLES.ADMIN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const payload = await req.json();
  const created = addProduct({ id: `p${Date.now()}`, ...payload });
  return NextResponse.json(created, { status: 201 });
}
