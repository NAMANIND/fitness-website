"use client";

import {
  normalizeInstagramReelUrl,
  parseInstagramShortcode,
} from "@/lib/instagramMedia";

export default function InstagramEmbed({
  url,
  title = "Instagram reel",
  className = "",
}: {
  url: string;
  title?: string;
  className?: string;
}) {
  const shortcode = parseInstagramShortcode(normalizeInstagramReelUrl(url));
  if (!shortcode) return null;

  return (
    <div
      className={`relative aspect-9/16 overflow-hidden rounded-xl bg-black ${className}`}
    >
      <iframe
        src={`https://www.instagram.com/reel/${shortcode}/embed`}
        title={title}
        className="absolute top-[-96px] left-1/2 h-full w-full min-w-[326px] origin-top -translate-x-1/2 scale-[1.5] border-0 bg-black"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        scrolling="no"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-14 bg-black"
        aria-hidden
      />
    </div>
  );
}
