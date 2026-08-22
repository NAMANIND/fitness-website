import { profileTemplate } from "@/data/profileTemplate";
import {
  isValidUsername,
  mergeProfile,
  normalizeUsername,
  type SiteProfile,
} from "@/lib/profile";
import {
  clearStoredProfile,
  readStoredProfile,
  writeStoredProfile,
} from "@/lib/profileStorage";

export type ClientProfileResolve = {
  profile: SiteProfile;
  username: string;
  notFound?: boolean;
};

function storedProfileFor(username: string) {
  const stored = readStoredProfile();
  if (stored?.username !== normalizeUsername(username)) return null;
  return mergeProfile(profileTemplate, stored.profile);
}

export function resolveClientProfile(
  routeUsername: string,
  serverProfile: SiteProfile,
  initialSource: 1 | 2,
  serverProfileReady: boolean,
): ClientProfileResolve {
  const normalized = normalizeUsername(routeUsername);

  if (typeof window === "undefined") {
    return {
      profile: serverProfile,
      username: normalized,
    };
  }

  const params = new URLSearchParams(window.location.search);

  if (initialSource === 2 && serverProfileReady && params.has("s2")) {
    const profile = mergeProfile(profileTemplate, serverProfile);
    writeStoredProfile(normalized, profile, 2);
    window.history.replaceState(null, "", `/${normalized}`);
    return { profile, username: normalized };
  }

  const stored = storedProfileFor(normalized);
  if (stored) {
    return { profile: stored, username: normalized };
  }

  if (serverProfileReady) {
    const profile = mergeProfile(profileTemplate, serverProfile);
    writeStoredProfile(normalized, profile, 1);
    return { profile, username: normalized };
  }

  if (params.has("s2")) {
    return {
      profile: serverProfile,
      username: normalized,
      notFound: true,
    };
  }

  return {
    profile: serverProfile,
    username: normalized,
    notFound: true,
  };
}

export async function fetchFreshProfile(username: string, source: 1 | 2) {
  const suffix = source === 2 ? "?s2" : "?s1";
  const response = await fetch(
    `/api/profiles/${encodeURIComponent(username)}${suffix}`,
  );
  if (!response.ok) return null;
  const body = (await response.json()) as { profile?: SiteProfile };
  if (!body.profile) return null;
  return mergeProfile(profileTemplate, body.profile);
}

export function cleanProfileQuery(username: string) {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("s1") && !params.has("s2")) return;
  window.history.replaceState(null, "", `/${normalizeUsername(username)}`);
}

export function shouldRedirectHomeFromStorage() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  if (params.has("reset")) return null;
  const stored = readStoredProfile();
  if (stored?.username && isValidUsername(stored.username)) {
    return stored.username;
  }
  return null;
}

export function applyHomeReset() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (!params.has("reset")) return false;
  clearStoredProfile();
  window.history.replaceState(null, "", "/");
  return true;
}
