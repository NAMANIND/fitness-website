import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookie, isAdmin } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const cookie = adminCookie(body.password ?? "");
  if (!cookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}

export async function GET() {
  return NextResponse.json({ ok: await isAdmin() });
}
