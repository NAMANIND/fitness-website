"use client";

import { useRef, useState } from "react";
import SiteImage from "@/components/SiteImage";

export default function ImageField({
  label,
  value,
  username,
  onChange,
}: {
  label: string;
  value: string;
  username: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);
    body.append("username", username);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    setUploading(false);
    if (!response.ok) {
      const json = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(json?.error ?? "Upload failed");
      return;
    }
    const json = (await response.json()) as { url?: string };
    if (json.url) onChange(json.url);
  }

  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
        {label}
      </span>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… or upload to Supabase"
          className="min-w-0 flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white outline-none focus:border-coral"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="shrink-0 rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 hover:border-coral hover:text-coral disabled:opacity-50"
        >
          {uploading ? "…" : "Upload"}
        </button>
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      {value ? (
        <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-neutral-800">
          {/\.(mp4|webm|mov)(\?|$)/i.test(value) ? (
            <video src={value} className="h-full w-full object-cover" muted playsInline />
          ) : (
            <SiteImage src={value} alt="" fill className="object-cover" unoptimized />
          )}
        </div>
      ) : null}
    </label>
  );
}
