"use client";

import InstagramEmbed from "@/components/InstagramEmbed";
import ReelVideo from "@/components/ReelVideo";
import SiteImage from "@/components/SiteImage";
import {
  isImageUrl,
  isVideoUrl,
  normalizeInstagramReelUrl,
  parseInstagramShortcode,
} from "@/lib/instagramMedia";
import type { MediaItem } from "@/lib/profile";

function reelPermalink(item: MediaItem) {
  for (const candidate of [item.instagramUrl, item.video]) {
    if (!candidate) continue;
    if (parseInstagramShortcode(candidate)) {
      return normalizeInstagramReelUrl(candidate);
    }
  }
  return null;
}

export default function ReelSlot({
  item,
  className = "",
}: {
  item: MediaItem;
  className?: string;
}) {
  const permalink = reelPermalink(item);

  if (item.video && isVideoUrl(item.video)) {
    return (
      <ReelVideo
        src={item.video}
        poster={item.poster}
        alt={item.alt}
        className={className}
      />
    );
  }

  if (permalink) {
    return (
      <InstagramEmbed url={permalink} title={item.alt} className={className} />
    );
  }

  if (item.poster && isImageUrl(item.poster)) {
    return (
      <div className={`relative aspect-9/16 overflow-hidden rounded-xl ${className}`}>
        <SiteImage
          src={item.poster}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-9/16 items-center justify-center rounded-xl bg-neutral-900 text-xs text-neutral-500 ${className}`}
    >
      Add a reel or video
    </div>
  );
}
