"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteProfile } from "@/lib/profile";

export default function JsonProfileModal({
  open,
  profile,
  defaultProfile,
  username,
  onClose,
  onApply,
}: {
  open: boolean;
  profile: SiteProfile;
  defaultProfile: SiteProfile;
  username: string;
  onClose: () => void;
  onApply: (profile: SiteProfile) => void;
}) {
  const [raw, setRaw] = useState(() => JSON.stringify(profile, null, 2));
  const [error, setError] = useState<string | null>(null);
  const profileRef = useRef(profile);
  profileRef.current = profile;

  useEffect(() => {
    if (!open) return;
    setRaw(JSON.stringify(profileRef.current, null, 2));
    setError(null);
  }, [open]);

  if (!open) return null;

  function apply() {
    try {
      const parsed = JSON.parse(raw) as SiteProfile;
      onApply({ ...parsed, username });
      setError(null);
      onClose();
    } catch {
      setError("Invalid JSON — fix syntax and try again");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 p-4 pt-[10vh]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Profile JSON editor"
    >
      <div
        className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-xl border border-neutral-700 bg-neutral-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <h2 className="text-sm font-semibold text-white">Profile JSON</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setRaw(JSON.stringify(defaultProfile, null, 2));
                setError(null);
              }}
              className="rounded-md border border-neutral-700 px-2 py-1 text-xs text-neutral-300 hover:border-coral hover:text-coral"
            >
              Reset to default
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-2 py-1 text-xs text-neutral-500 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
        <textarea
          value={raw}
          onChange={(event) => {
            setRaw(event.target.value);
            setError(null);
          }}
          spellCheck={false}
          className="min-h-[50vh] flex-1 resize-none bg-neutral-900 p-4 font-mono text-xs leading-relaxed text-white outline-none"
        />
        {error ? <p className="px-4 pb-2 text-xs text-red-400">{error}</p> : null}
        <div className="flex justify-end gap-2 border-t border-neutral-800 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={apply}
            className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white"
          >
            Apply to preview
          </button>
        </div>
      </div>
    </div>
  );
}
