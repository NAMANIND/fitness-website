import { profileTemplate } from "@/data/profileTemplate";
import { db, rowToProfile } from "@/lib/db";
import {
  isValidUsername,
  mergeProfile,
  normalizeUsername,
} from "@/lib/profile";
import { fetchRemoteProfile } from "@/lib/s2";

type Query = {
  s1?: string | string[];
  s2?: string | string[];
};

export async function getRequestProfile(username: string, query?: Query) {
  const normalized = normalizeUsername(username);
  if (!isValidUsername(normalized)) return null;

  const explicitS2 = query?.s2 !== undefined;
  const explicitS1 = query?.s1 !== undefined;

  if (explicitS2) {
    const profile = await fetchRemoteProfile(normalized);
    if (!profile) return null;
    return {
      source: 2 as const,
      username: normalized,
      profile,
      profileReady: true,
    };
  }

  const prisma = db();
  if (prisma) {
    const row = await prisma.profile.findUnique({ where: { username: normalized } });
    if (row) {
      return {
        source: 1 as const,
        username: normalized,
        profile: rowToProfile(row),
        profileReady: true,
      };
    }
  }

  if (explicitS1) return null;

  return {
    source: 1 as const,
    username: normalized,
    profile: mergeProfile(profileTemplate, { username: normalized }),
    profileReady: false,
  };
}
