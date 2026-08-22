import { Prisma, PrismaClient, type Profile } from "@prisma/client";
import { profileTemplate } from "@/data/profileTemplate";
import { mergeProfile, type SiteProfile } from "@/lib/profile";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function db() {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export function profileToRow(profile: SiteProfile) {
  return {
    username: profile.username,
    data: profile as unknown as Prisma.InputJsonValue,
  };
}

export function rowToProfile(row: Profile): SiteProfile {
  return mergeProfile(profileTemplate, {
    ...(row.data as SiteProfile),
    username: row.username,
  });
}

export { Prisma };
