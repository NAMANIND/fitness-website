const PROXY_SUFFIXES = ["fbcdn.net", "cdninstagram.com", "socialinsider.io"];

export function isProxyImageUrl(url: string) {
  try {
    const { hostname, protocol } = new URL(url);
    if (protocol !== "https:") return false;
    return PROXY_SUFFIXES.some(
      (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`),
    );
  } catch {
    return false;
  }
}

export function proxyImageUrl(url: string) {
  if (!url || url.startsWith("/api/image") || !isProxyImageUrl(url)) return url;
  return `/api/image?url=${encodeURIComponent(url)}`;
}

export const proxyMediaUrl = proxyImageUrl;
