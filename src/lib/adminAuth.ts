import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "fw_admin";

function digest(value: string) {
  return createHmac("sha256", "fw-admin").update(value).digest();
}

function sessionToken() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update("admin").digest("hex");
}

export async function isAdmin() {
  const expected = sessionToken();
  if (!expected) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value || value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export function adminCookie(password: string) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  if (!timingSafeEqual(digest(password), digest(secret))) return null;
  const value = sessionToken();
  if (!value) return null;
  return {
    name: COOKIE,
    value,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export { COOKIE as ADMIN_COOKIE };
