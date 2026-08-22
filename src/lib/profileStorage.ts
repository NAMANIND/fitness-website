import {
  PROFILE_STORAGE_KEY,
  type SiteProfile,
  normalizeUsername,
  parseStoredProfile,
} from "@/lib/profile";

export function readStoredProfile() {
  if (typeof window === "undefined") return null;
  try {
    return parseStoredProfile(window.localStorage.getItem(PROFILE_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeStoredProfile(
  username: string,
  profile: SiteProfile,
  source: 1 | 2,
) {
  const normalized = normalizeUsername(username);
  try {
    window.localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({ username: normalized, profile, source, savedAt: Date.now() }),
    );
  } catch {
    // private mode / quota — skip silently
  }
}

export function clearStoredProfile() {
  try {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch {
    // ignore
  }
}
