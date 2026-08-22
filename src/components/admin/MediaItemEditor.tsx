"use client";

import ImageField from "@/components/admin/ImageField";
import {
  isImageUrl,
  isInstagramReelUrl,
  isVideoUrl,
  normalizeInstagramReelUrl,
} from "@/lib/instagramMedia";
import type { MediaItem } from "@/lib/profile";

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-coral"
      />
    </label>
  );
}

function applySource(item: MediaItem, raw: string) {
  const url = raw.trim();
  if (!url) {
    return { ...item, video: "", poster: "", instagramUrl: "" };
  }
  if (isInstagramReelUrl(url)) {
    return {
      ...item,
      instagramUrl: normalizeInstagramReelUrl(url),
      video: "",
    };
  }
  if (isVideoUrl(url)) {
    return { ...item, video: url, instagramUrl: "" };
  }
  if (isImageUrl(url)) {
    return { ...item, poster: url, video: "", instagramUrl: "" };
  }
  return { ...item, video: url };
}

function sourceLabel(item: MediaItem) {
  if (item.instagramUrl) return item.instagramUrl;
  if (item.video) return item.video;
  if (item.poster) return item.poster;
  return "";
}

export default function MediaItemEditor({
  item,
  username,
  onChange,
  onRemove,
}: {
  item: MediaItem;
  username: string;
  onChange: (item: MediaItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-neutral-800 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-neutral-500">Reel, video, or image</p>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-neutral-500 hover:text-red-400"
        >
          Remove
        </button>
      </div>
      <Field
        label="Source URL"
        value={sourceLabel(item)}
        onChange={(source) => onChange(applySource(item, source))}
      />
      <Field label="Alt text" value={item.alt} onChange={(alt) => onChange({ ...item, alt })} />
      {item.instagramUrl ? (
        <p className="text-xs text-neutral-500">Instagram reel — plays as embed on site.</p>
      ) : null}
      {!item.instagramUrl ? (
        <>
          <ImageField
            label="Video URL (optional)"
            value={item.video}
            username={username}
            onChange={(video) => onChange({ ...item, video, instagramUrl: "" })}
          />
          <ImageField
            label="Poster image (optional)"
            value={item.poster}
            username={username}
            onChange={(poster) => onChange({ ...item, poster })}
          />
        </>
      ) : (
        <ImageField
          label="Poster override (optional)"
          value={item.poster}
          username={username}
          onChange={(poster) => onChange({ ...item, poster })}
        />
      )}
    </div>
  );
}
