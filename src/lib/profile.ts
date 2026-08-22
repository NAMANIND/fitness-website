export type NavLink = { label: string; href: string };

export type Program = {
  title: string;
  description: string;
  image: string;
  isNew: boolean;
  theme: "night" | "day" | string;
  cta: string;
};

export type Package = {
  name: string;
  price: string;
  billing: string;
  description: string;
  featured: boolean;
  badge: string | null;
};

export type Testimonial = {
  name: string;
  weeks: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
};

export type MediaItem = {
  video: string;
  poster: string;
  alt: string;
  instagramUrl?: string;
};

export type SiteProfile = {
  username: string;
  brand: {
    shortName: string;
    name: string;
    firstName: string;
    tagline: string;
  };
  seo: {
    title: string;
    description: string;
    locale: string;
    instagram: string;
    instagramUrl: string;
    email: string;
    keywords: string[];
  };
  images: {
    hero: string;
    about: string;
    og: string;
  };
  hero: {
    heading: {
      line1: string;
      accent: string;
      line2: string;
      line3: string;
    };
    subtext: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string };
    socialProof: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    paragraphs: string[];
    tagline: string;
    stats: { value: string; label: string }[];
  };
  programs: Program[];
  packages: Package[];
  testimonials: Testimonial[];
  credibility: string[];
  shop: {
    ctaUrl: string;
    promoCode: string;
    discount: string;
    items: MediaItem[];
  };
  supplements: {
    ctaUrl: string;
    items: MediaItem[];
  };
  instagramTiles: string[];
  scarcityMessage: string;
  sectionCopy: {
    programs: { subheading: string };
    pricing: { subheading: string };
    finalCta: { subheading: string };
  };
};

export const PROFILE_STORAGE_KEY = "fw_profile";

type SourceQuery = {
  s1?: string | string[];
  s2?: string | string[];
};

export function parseSource(
  input?: URLSearchParams | SourceQuery | null,
): 1 | 2 {
  if (!input) return 1;
  if (input instanceof URLSearchParams) {
    return input.has("s2") ? 2 : 1;
  }
  return input.s2 !== undefined ? 2 : 1;
}

export function explicitSource(
  input?: URLSearchParams | SourceQuery | null,
): 1 | 2 | null {
  if (!input) return null;
  if (input instanceof URLSearchParams) {
    if (input.has("s2")) return 2;
    if (input.has("s1")) return 1;
    return null;
  }
  if (input.s2 !== undefined) return 2;
  if (input.s1 !== undefined) return 1;
  return null;
}

export function normalizeUsername(value: string | null | undefined) {
  if (!value) return "";
  return value.trim().toLowerCase().replace(/^@+/, "");
}

export function isValidUsername(value: string) {
  return (
    /^[a-z0-9._]{1,30}$/.test(value) &&
    !value.startsWith(".") &&
    !value.endsWith(".") &&
    !value.includes("..")
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeObj<T extends Record<string, unknown>>(base: T, patch: unknown): T {
  if (!isObject(patch)) return base;
  const next = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const current = next[key as keyof T];
    if (isObject(current) && isObject(value) && !Array.isArray(current)) {
      next[key as keyof T] = mergeObj(
        current as Record<string, unknown>,
        value,
      ) as T[keyof T];
    } else {
      next[key as keyof T] = value as T[keyof T];
    }
  }
  return next;
}

export function mergeProfile(base: SiteProfile, patch: unknown): SiteProfile {
  return mergeObj(base as unknown as Record<string, unknown>, patch) as SiteProfile;
}

export function parseStoredProfile(raw: string | null): {
  username: string;
  profile: SiteProfile;
  source: 1 | 2;
} | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as {
      username?: string;
      profile?: unknown;
      source?: number;
    };
    if (!parsed?.username || !parsed.profile) return null;
    return {
      username: normalizeUsername(parsed.username),
      profile: parsed.profile as SiteProfile,
      source: parsed.source === 2 ? 2 : 1,
    };
  } catch {
    return null;
  }
}
