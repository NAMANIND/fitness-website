import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { profileTemplate } from "@/data/profileTemplate";
import { isAdmin } from "@/lib/adminAuth";
import {
  deleteProfile,
  getProfileRow,
  updateProfile,
} from "@/lib/profileServer";
import { db, rowToProfile } from "@/lib/db";
import {
  isValidUsername,
  mergeProfile,
  normalizeUsername,
} from "@/lib/profile";

async function requireAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!db()) {
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 500 },
    );
  }
  const username = normalizeUsername((await context.params).username);
  const row = await getProfileRow(username);
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    username: row.username,
    data: rowToProfile(row),
  });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const username = normalizeUsername((await context.params).username);
  if (!isValidUsername(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }
  const body = (await request.json()) as { data?: unknown };
  const patch =
    body.data && typeof body.data === "object" && !Array.isArray(body.data)
      ? body.data
      : {};
  const data = mergeProfile(profileTemplate, { ...patch, username });
  try {
    const row = await updateProfile(username, data);
    if (!row) {
      return NextResponse.json(
        { error: "Database is not configured" },
        { status: 500 },
      );
    }
    return NextResponse.json({ profile: row });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ username: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const username = normalizeUsername((await context.params).username);
  try {
    const row = await deleteProfile(username);
    if (!row) {
      return NextResponse.json(
        { error: "Database is not configured" },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw error;
  }
}
