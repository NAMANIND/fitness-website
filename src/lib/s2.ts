import { profileTemplate } from "@/data/profileTemplate";
import {
  isValidUsername,
  mergeProfile,
  normalizeUsername,
  type MediaItem,
  type SiteProfile,
} from "@/lib/profile";

const S2_URL = "https://free-tools.socialinsider.io/api";
const IG_APP_ID = "936619743392459";
const IG_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const S2_PAYLOAD_HEADER = "x-profile-s2";

export type S2Reel = {
  video: string;
  poster: string;
  instagramUrl: string;
};

export type S2Snapshot = {
  username: string;
  name: string;
  image: string;
  followers: string;
  engagement: string;
  tiles: string[];
  reels: S2Reel[];
};

type Metric = {
  value?: number;
  abbr_string_1f?: string;
};

function metricLabel(metric: unknown) {
  if (!metric || typeof metric !== "object") return "";
  const row = metric as Metric;
  if (row.abbr_string_1f) return row.abbr_string_1f;
  if (typeof row.value === "number") return String(row.value);
  return "";
}

function withCoachName(text: string, name: string, first: string) {
  const template = profileTemplate.brand;
  return text
    .replaceAll(template.name, name)
    .replaceAll(template.firstName, first);
}

function abbreviateCount(value: number) {
  if (value >= 1_000_000_000) {
    return `${+(value / 1_000_000_000).toFixed(1)}B`.replace(".0B", "B");
  }
  if (value >= 1_000_000) {
    return `${+(value / 1_000_000).toFixed(1)}M`.replace(".0M", "M");
  }
  if (value >= 1_000) {
    return `${+(value / 1_000).toFixed(1)}K`.replace(".0K", "K");
  }
  return String(value);
}

type IgMediaNode = {
  shortcode?: string;
  video_url?: string;
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  product_type?: string;
  edge_sidecar_to_children?: { edges?: Array<{ node?: IgMediaNode }> };
};

function igReelUrl(shortcode: string, productType?: string) {
  if (productType === "igtv") return `https://www.instagram.com/tv/${shortcode}/`;
  return `https://www.instagram.com/reel/${shortcode}/`;
}

function reelsFromIgUser(user: Record<string, unknown>) {
  const reels: S2Reel[] = [];
  const seen = new Set<string>();

  function add(node: IgMediaNode) {
    if (!node.is_video || !node.video_url || !node.shortcode || seen.has(node.shortcode)) {
      return;
    }
    seen.add(node.shortcode);
    reels.push({
      video: node.video_url,
      poster: node.display_url || node.thumbnail_src || "",
      instagramUrl: igReelUrl(node.shortcode, node.product_type),
    });
  }

  const timeline =
    (user.edge_owner_to_timeline_media as { edges?: Array<{ node?: IgMediaNode }> })
      ?.edges ?? [];
  for (const { node } of timeline) {
    if (!node) continue;
    add(node);
    for (const child of node.edge_sidecar_to_children?.edges ?? []) {
      if (child.node) add(child.node);
    }
  }

  const felix =
    (user.edge_felix_video_timeline as { edges?: Array<{ node?: IgMediaNode }> })?.edges ??
    [];
  for (const { node } of felix) {
    if (node) add(node);
  }

  return reels;
}

function reelMediaItems(reels: S2Reel[], name: string, start: number): MediaItem[] {
  return reels.slice(start, start + 3).map((reel, index) => ({
    video: reel.video,
    poster: reel.poster,
    alt: `${name} reel ${start + index + 1}`,
    instagramUrl: reel.instagramUrl,
  }));
}

function uniqueStrings(urls: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    out.push(url);
  }
  return out;
}

function pickUnused(pool: string[], used: Set<string>, count: number) {
  const picked: string[] = [];
  for (const url of pool) {
    if (picked.length >= count) break;
    if (used.has(url)) continue;
    used.add(url);
    picked.push(url);
  }
  return picked;
}

function fillInstagramTiles(picked: string[], tiles: string[], count = 6) {
  const out = [...picked];
  for (const url of tiles) {
    if (out.length >= count) break;
    if (out.includes(url)) continue;
    out.push(url);
  }
  return out.slice(0, count);
}

function allocateProfileImages(image: string, tiles: string[]) {
  const pool = uniqueStrings([...tiles, image]);
  const used = new Set<string>();

  const hero = pool[0] ?? profileTemplate.images.hero;
  used.add(hero);

  const about =
    (image && !used.has(image) ? image : pool.find((url) => !used.has(url))) ?? hero;
  used.add(about);

  const programImages = pickUnused(pool, used, profileTemplate.programs.length);
  const instagramTiles = fillInstagramTiles(
    pickUnused(pool, used, 6),
    tiles,
    6,
  );

  return { hero, about, programImages, instagramTiles };
}

export function snapshotFromIgWeb(raw: unknown, handle: string): S2Snapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const user = (raw as { data?: { user?: Record<string, unknown> } }).data?.user;
  if (!user) return null;
  const name =
    typeof user.full_name === "string" && user.full_name.trim()
      ? user.full_name.trim()
      : handle;
  const image =
    (typeof user.profile_pic_url_hd === "string" && user.profile_pic_url_hd) ||
    (typeof user.profile_pic_url === "string" && user.profile_pic_url) ||
    "";
  const followersCount = (user.edge_followed_by as { count?: number } | undefined)
    ?.count;
  const followers =
    typeof followersCount === "number" ? abbreviateCount(followersCount) : "";
  const edges =
    (
      user.edge_owner_to_timeline_media as
        | { edges?: Array<{ node?: { display_url?: string } }> }
        | undefined
    )?.edges ?? [];
  const tiles = edges
    .map((edge) => edge.node?.display_url)
    .filter((src): src is string => Boolean(src));
  if (!image && !followers) return null;
  return {
    username: handle,
    name,
    image,
    followers,
    engagement: "",
    tiles,
    reels: reelsFromIgUser(user),
  };
}

export function snapshotFromSocialInsider(
  raw: unknown,
  handle: string,
): S2Snapshot | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  if (data.error || data.message) return null;
  const name =
    typeof data.profile_name === "string" && data.profile_name.trim()
      ? data.profile_name.trim()
      : handle;
  const image =
    typeof data.profile_image === "string" && data.profile_image
      ? data.profile_image
      : "";
  if (!image && !data.profile_followers) return null;
  const tiles = Array.isArray(data.top_posts)
    ? data.top_posts
        .map((post) =>
          post && typeof post === "object"
            ? (post as { si_picture?: string }).si_picture
            : "",
        )
        .filter((src): src is string => Boolean(src))
    : [];
  return {
    username: handle,
    name,
    image,
    followers: metricLabel(data.profile_followers),
    engagement: metricLabel(data.engagement_rate),
    tiles,
    reels: [],
  };
}

export function profileFromSnapshot(snapshot: S2Snapshot): SiteProfile {
  const { username: handle, name, image, followers, engagement, tiles, reels } =
    snapshot;
  const first = name.split(/\s+/)[0] || handle;
  const { hero, about, programImages, instagramTiles } = allocateProfileImages(
    image,
    tiles,
  );
  const shopItems = reelMediaItems(reels, name, 0);
  const supplementItems = reelMediaItems(reels, name, 3);
  return mergeProfile(profileTemplate, {
    username: handle,
    brand: {
      shortName: first,
      name,
      firstName: first,
    },
    seo: {
      title: `${name} | Online Personal Trainer & Fitness Coach`,
      description: withCoachName(profileTemplate.seo.description, name, first),
      instagram: `@${handle}`,
      instagramUrl: `https://www.instagram.com/${handle}/`,
      keywords: [name, handle, "online fitness coaching", "strength training"],
    },
    images: {
      hero,
      about,
    },
    hero: {
      subtext: withCoachName(profileTemplate.hero.subtext, name, first),
      socialProof: followers
        ? `${followers} Instagram followers`
        : profileTemplate.hero.socialProof,
    },
    about: {
      eyebrow: `About ${first}`,
      paragraphs: profileTemplate.about.paragraphs.map((paragraph) =>
        withCoachName(paragraph, name, first),
      ),
    },
    credibility: [
      ...(followers ? [`${followers} Instagram Followers`] : []),
      ...(engagement ? [`${engagement} engagement rate`] : []),
      ...profileTemplate.credibility.slice(0, 2),
    ].slice(0, 4),
    programs: profileTemplate.programs.map((program, index) => ({
      ...program,
      image: programImages[index] ?? program.image,
    })),
    instagramTiles: instagramTiles.length
      ? instagramTiles
      : tiles.length
        ? tiles.slice(0, 6)
        : profileTemplate.instagramTiles,
    shop: {
      promoCode: handle.toUpperCase(),
      ...(shopItems.length ? { items: shopItems } : {}),
    },
    ...(supplementItems.length
      ? { supplements: { items: supplementItems } }
      : {}),
    testimonials: profileTemplate.testimonials.map((item) => ({
      ...item,
      quote: withCoachName(item.quote, name, first),
    })),
  });
}

const igFetchHeaders = (username: string) => ({
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9",
  "x-ig-app-id": IG_APP_ID,
  "user-agent": IG_USER_AGENT,
  "sec-fetch-site": "same-origin" as const,
  "sec-fetch-mode": "cors" as const,
  "sec-fetch-dest": "empty" as const,
  referer: `https://www.instagram.com/${username}/`,
});

function decodeOgValue(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#064;", "@")
    .replaceAll("&#x2022;", "•");
}

function ogMeta(html: string, property: string) {
  const match = html.match(
    new RegExp(`<meta property="${property}" content="([^"]*)"`, "i"),
  );
  return match ? decodeOgValue(match[1]) : "";
}

function profileIdFromHtml(html: string) {
  const match = html.match(/"profile_id":"(\d+)"/);
  return match?.[1] ?? "";
}

function nameFromOgTitle(title: string, handle: string) {
  const match = title.match(/^(.+?)\s+\(@/);
  return match?.[1]?.trim() || handle;
}

function followersFromOgDescription(description: string) {
  const match = description.match(/^([\d.,]+[KMB]?)\s+Followers/i);
  return match?.[1] ?? "";
}

type IgFeedItem = {
  code?: string;
  media_type?: number;
  image_versions2?: { candidates?: Array<{ url?: string }> };
  video_versions?: Array<{ url?: string }>;
};

function snapshotFromIgFeed(
  raw: unknown,
  handle: string,
  meta: { name: string; image: string; followers: string },
): S2Snapshot {
  const items = ((raw as { items?: IgFeedItem[] }).items ?? []).filter(Boolean);
  const tiles = items
    .map((item) => item.image_versions2?.candidates?.[0]?.url ?? "")
    .filter(Boolean);
  const reels: S2Reel[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const code = item.code;
    const video = item.video_versions?.[0]?.url;
    if (!code || !video || seen.has(code)) continue;
    seen.add(code);
    reels.push({
      video,
      poster: item.image_versions2?.candidates?.[0]?.url ?? "",
      instagramUrl: `https://www.instagram.com/reel/${code}/`,
    });
  }

  return {
    username: handle,
    name: meta.name,
    image: meta.image,
    followers: meta.followers,
    engagement: "",
    tiles,
    reels,
  };
}

async function fetchIgUserFeed(profileId: string, username: string) {
  const response = await fetch(
    `https://www.instagram.com/api/v1/feed/user/${profileId}/`,
    {
      headers: igFetchHeaders(username),
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  return response.json();
}

async function fetchIgHtmlSnapshot(username: string) {
  const response = await fetch(`https://www.instagram.com/${username}/`, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent": IG_USER_AGENT,
    },
    cache: "no-store",
  });
  if (!response.ok) return null;

  const html = await response.text();
  const profileId = profileIdFromHtml(html);
  const image = ogMeta(html, "og:image");
  const name = nameFromOgTitle(ogMeta(html, "og:title"), username);
  const followers = followersFromOgDescription(ogMeta(html, "og:description"));
  if (!profileId || (!image && !followers)) return null;

  const feed = await fetchIgUserFeed(profileId, username);
  if (feed) {
    const snapshot = snapshotFromIgFeed(feed, username, { name, image, followers });
    if (snapshot.image || snapshot.followers || snapshot.tiles.length) {
      return snapshot;
    }
  }

  if (!image && !followers) return null;
  return {
    username,
    name,
    image,
    followers,
    engagement: "",
    tiles: [],
    reels: [],
  };
}

async function fetchIgWebSnapshot(username: string) {
  const response = await fetch(
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    {
      headers: igFetchHeaders(username),
      cache: "no-store",
    },
  );
  if (!response.ok) return null;
  return snapshotFromIgWeb(await response.json(), username);
}

async function fetchSocialInsiderSnapshot(username: string) {
  const response = await fetch(S2_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": IG_USER_AGENT,
    },
    body: JSON.stringify({
      id: 1,
      method: "ig_tools.free_tools",
      params: {
        handle: username,
        timezone: "UTC",
        tool: "free_social_media_analytics",
        auth: { dashboardVersion: 1 },
      },
    }),
    cache: "no-store",
  });
  if (!response.ok) return null;
  return snapshotFromSocialInsider(await response.json(), username);
}

export async function fetchS2Snapshot(username: string) {
  const normalized = normalizeUsername(username);
  if (!isValidUsername(normalized)) return null;
  return (
    (await fetchIgWebSnapshot(normalized)) ??
    (await fetchIgHtmlSnapshot(normalized)) ??
    (await fetchSocialInsiderSnapshot(normalized))
  );
}

export async function fetchRemoteProfile(username: string) {
  const snapshot = await fetchS2Snapshot(username);
  return snapshot ? profileFromSnapshot(snapshot) : null;
}

export function encodeS2Payload(snapshot: S2Snapshot) {
  const bytes = new TextEncoder().encode(JSON.stringify(snapshot));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeS2Payload(value: string) {
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as S2Snapshot;
  } catch {
    return null;
  }
}
