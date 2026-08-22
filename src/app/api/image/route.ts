import { NextResponse } from "next/server";
import { isProxyImageUrl } from "@/lib/imageProxy";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function mediaContentType(url: string, upstream: string | null) {
  const base = upstream?.split(";")[0]?.trim();
  if (base?.startsWith("video/") || base?.startsWith("image/")) return base;
  if (url.includes("/o1/v/") || url.includes(".mp4")) return "video/mp4";
  if (url.includes(".webp")) return "image/webp";
  return base || "image/jpeg";
}

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target || !isProxyImageUrl(target)) {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const upstreamHeaders: Record<string, string> = {
    accept: "image/*,video/*,*/*",
    "user-agent": USER_AGENT,
    referer: "https://www.instagram.com/",
  };
  const range = request.headers.get("range");
  if (range) upstreamHeaders.range = range;

  const response = await fetch(target, {
    headers: upstreamHeaders,
    cache: "no-store",
  });

  if (!response.ok) {
    return new NextResponse(null, { status: response.status });
  }

  const upstreamType = response.headers.get("content-type");
  if (
    upstreamType?.includes("text/html") ||
    upstreamType?.includes("application/json")
  ) {
    return new NextResponse(null, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", mediaContentType(target, upstreamType));
  headers.set("Cache-Control", "public, max-age=3600");
  headers.set("Accept-Ranges", response.headers.get("accept-ranges") ?? "bytes");

  for (const name of ["content-length", "content-range"] as const) {
    const value = response.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers,
  });
}
