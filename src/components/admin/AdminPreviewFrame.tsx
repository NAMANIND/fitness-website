"use client";

import { useEffect, useRef } from "react";
import type { SiteProfile } from "@/lib/profile";

export function scrollPreviewSection(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  sectionId: string,
) {
  iframeRef.current?.contentWindow?.postMessage(
    { type: "scroll", sectionId },
    window.location.origin,
  );
}

export default function AdminPreviewFrame({
  profile,
  iframeRef: externalRef,
}: {
  profile: SiteProfile;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
}) {
  const internalRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = externalRef ?? internalRef;

  useEffect(() => {
    const sendProfile = () => {
      iframeRef.current?.contentWindow?.postMessage(
        { type: "profile", profile },
        window.location.origin,
      );
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "preview-ready") sendProfile();
    };

    window.addEventListener("message", onMessage);
    sendProfile();
    return () => window.removeEventListener("message", onMessage);
  }, [profile, iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      src="/preview"
      title="Live preview"
      className="h-full w-full border-0 bg-charcoal"
    />
  );
}
