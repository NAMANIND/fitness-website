import { NextResponse } from "next/server";
import { getRequestProfile } from "@/lib/getRequestProfile";
import { isValidUsername, normalizeUsername } from "@/lib/profile";

export async function GET(
  request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const username = normalizeUsername((await context.params).username);
  if (!isValidUsername(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }
  const url = new URL(request.url);
  const query = url.searchParams.has("s2")
    ? { s2: "" }
    : url.searchParams.has("s1")
      ? { s1: "" }
      : undefined;
  const resolved = await getRequestProfile(username, query);
  if (!resolved?.profileReady) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ profile: resolved.profile });
}
