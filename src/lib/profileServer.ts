import { cache } from "react";
import { Prisma } from "@prisma/client";
import { profileTemplate } from "@/data/profileTemplate";
import { db, profileToRow, rowToProfile } from "@/lib/db";
import { fetchRemoteProfile } from "@/lib/s2";
import {
  isValidUsername,
  normalizeUsername,
  type SiteProfile,
} from "@/lib/profile";

export { fetchRemoteProfile };

export const resolveProfile = cache(async (username: string | null) => {
  const normalized = normalizeUsername(username);
  if (!normalized || !isValidUsername(normalized)) {
    return { username: null as string | null, profile: profileTemplate };
  }
  const remote = await fetchRemoteProfile(normalized);
  if (!remote) {
    return { username: null as string | null, profile: profileTemplate };
  }
  return { username: normalized, profile: remote };
});

export async function listProfiles() {
  const prisma = db();
  if (!prisma) return null;
  const rows = await prisma.profile.findMany({
    select: { username: true, data: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  return rows.map((row) => {
    const data = row.data as SiteProfile;
    return {
      username: row.username,
      name: data.brand?.name ?? row.username,
      updatedAt: row.updatedAt,
    };
  });
}

export async function createProfile(profile: SiteProfile) {
  const prisma = db();
  if (!prisma) return { error: "unconfigured" as const };
  try {
    const row = await prisma.profile.create({ data: profileToRow(profile) });
    return { row };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "conflict" as const };
    }
    throw error;
  }
}

export async function updateProfile(username: string, profile: SiteProfile) {
  const prisma = db();
  if (!prisma) return null;
  return prisma.profile.update({
    where: { username },
    data: profileToRow(profile),
  });
}

export async function getProfileRow(username: string) {
  const prisma = db();
  if (!prisma) return null;
  return prisma.profile.findUnique({ where: { username } });
}

export async function deleteProfile(username: string) {
  const prisma = db();
  if (!prisma) return null;
  return prisma.profile.delete({ where: { username } });
}
