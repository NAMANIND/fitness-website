import { NextResponse } from "next/server";
import { profileTemplate } from "@/data/profileTemplate";
import { isAdmin } from "@/lib/adminAuth";
import { createProfile, listProfiles } from "@/lib/profileServer";
import {
  isValidUsername,
  mergeProfile,
  normalizeUsername,
} from "@/lib/profile";

async function requireAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const profiles = await listProfiles();
  if (!profiles) {
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 500 },
    );
  }
  return NextResponse.json({ profiles });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const body = (await request.json()) as { username?: string; data?: unknown };
  const username = normalizeUsername(body.username);
  if (!isValidUsername(username)) {
    return NextResponse.json(
      { error: "Username must be 2-32 letters, numbers, or _" },
      { status: 400 },
    );
  }
  const patch =
    body.data && typeof body.data === "object" && !Array.isArray(body.data)
      ? body.data
      : {};
  const data = mergeProfile(profileTemplate, { ...patch, username });
  const result = await createProfile(data);
  if ("error" in result && result.error === "unconfigured") {
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 500 },
    );
  }
  if ("error" in result && result.error === "conflict") {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }
  if ("row" in result) {
    return NextResponse.json({ profile: result.row });
  }
  return NextResponse.json({ error: "Failed to create" }, { status: 502 });
}
