"use client";

import { notFound, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { profileHref } from "@/lib/profileHref";
import type { SiteProfile } from "@/lib/profile";
import { explicitSource } from "@/lib/profile";
import { readStoredProfile, writeStoredProfile } from "@/lib/profileStorage";
import {
  applyHomeReset,
  cleanProfileQuery,
  fetchFreshProfile,
  resolveClientProfile,
  shouldRedirectHomeFromStorage,
} from "@/lib/resolveClientProfile";

type SiteProfileContextValue = {
  profile: SiteProfile;
  username: string | null;
  href: (path: string) => string;
};

const SiteProfileContext = createContext<SiteProfileContextValue | null>(null);

export function useSiteProfile() {
  const context = useContext(SiteProfileContext);
  if (!context) {
    throw new Error("useSiteProfile must be used within SiteProfileProvider");
  }
  return context;
}

type SiteProfileProviderProps = {
  children: ReactNode;
} & (
  | { mode?: "static"; profile: SiteProfile }
  | {
      mode: "dynamic";
      routeUsername: string;
      initialProfile: SiteProfile;
      initialSource: 1 | 2;
      profileReady?: boolean;
    }
);

export function SiteProfileProvider(props: SiteProfileProviderProps) {
  const { children } = props;
  const isStatic = props.mode !== "dynamic";

  const [boot, setBoot] = useState(() => ({
    ready: false,
    profile: (isStatic ? props.profile : props.initialProfile) as SiteProfile,
    username: (isStatic ? null : props.routeUsername) as string | null,
  }));

  useLayoutEffect(() => {
    if (isStatic) {
      setBoot({ ready: true, profile: props.profile, username: null });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const explicit = explicitSource(params);

    const resolved = resolveClientProfile(
      props.routeUsername,
      props.initialProfile,
      props.initialSource,
      props.profileReady ?? false,
    );

    if (resolved.notFound) {
      notFound();
      return;
    }

    setBoot({
      ready: true,
      profile: resolved.profile,
      username: resolved.username,
    });

    const refreshSource =
      explicit ?? readStoredProfile()?.source ?? null;
    if (!refreshSource) return;

    void fetchFreshProfile(resolved.username, refreshSource).then((fresh) => {
      if (!fresh) return;
      writeStoredProfile(resolved.username, fresh, refreshSource);
      setBoot((current) => ({ ...current, profile: fresh }));
      if (explicit) cleanProfileQuery(resolved.username);
    });
  }, [isStatic, props]);

  const value = useMemo(
    () => ({
      profile: boot.profile,
      username: boot.username,
      href: (path: string) => profileHref(boot.username, path),
    }),
    [boot.profile, boot.username],
  );

  if (!boot.ready) return null;

  return (
    <SiteProfileContext.Provider value={value}>{children}</SiteProfileContext.Provider>
  );
}

export function HomeProfileGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    applyHomeReset();
    const redirect = shouldRedirectHomeFromStorage();
    if (redirect) {
      router.replace(`/${redirect}`);
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return children;
}
