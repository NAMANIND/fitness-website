"use client";

import { useEffect, useState } from "react";
import SitePage from "@/components/SitePage";
import { SiteProfileProvider } from "@/components/SiteProfileProvider";
import { previewScrollTarget } from "@/lib/previewSections";
import type { SiteProfile } from "@/lib/profile";

type PreviewMessage =
  | { type: "profile"; profile: SiteProfile }
  | { type: "scroll"; sectionId: string };

export default function PreviewPage() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent<PreviewMessage>) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;

      if (data.type === "profile") {
        setProfile(data.profile);
        return;
      }

      if (data.type === "scroll") {
        const target = previewScrollTarget(data.sectionId);
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "preview-ready" }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!profile) return null;

  return (
    <SiteProfileProvider profile={profile}>
      <SitePage />
    </SiteProfileProvider>
  );
}
