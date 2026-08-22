const IG_MEDIA_RE =
  /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i;

export function parseInstagramShortcode(url: string) {
  const match = url.trim().match(IG_MEDIA_RE);
  return match?.[1] ?? null;
}

export function isInstagramReelUrl(url: string) {
  return /instagram\.com\/(?:reel|reels)\//i.test(url.trim());
}

export function normalizeInstagramReelUrl(url: string) {
  const shortcode = parseInstagramShortcode(url);
  if (!shortcode) return url.trim();
  return `https://www.instagram.com/reel/${shortcode}/`;
}

export function isVideoUrl(url: string) {
  const value = url.trim();
  if (!value) return false;
  if (isInstagramReelUrl(value)) return false;
  return /\.(mp4|webm|mov)(\?|$)/i.test(value) || value.includes("/o1/v/");
}

export function isImageUrl(url: string) {
  const value = url.trim();
  if (!value) return false;
  if (isVideoUrl(value) || isInstagramReelUrl(value)) return false;
  return (
    /\.(jpg|jpeg|png|webp|gif|avif)(\?|$)/i.test(value) ||
    value.includes("cdninstagram") ||
    value.includes("fbcdn.net") ||
    value.includes("supabase.co")
  );
}
