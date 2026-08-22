import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "@/components/SitePage";
import { SiteProfileProvider } from "@/components/SiteProfileProvider";
import { getRequestProfile } from "@/lib/getRequestProfile";
import { profileAbsoluteUrl, profileSiteConfig } from "@/lib/profileSeo";

export const dynamic = "force-dynamic";

type Search = Promise<{ s1?: string; s2?: string }>;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Search;
}): Promise<Metadata> {
  const { username } = await params;
  const resolved = await getRequestProfile(username, await searchParams);
  if (!resolved) notFound();
  const config = profileSiteConfig(resolved.profile);
  const url = profileAbsoluteUrl(resolved.username);
  return {
    title: config.title,
    description: config.description,
    keywords: [...config.keywords],
    authors: [{ name: config.name, url }],
    openGraph: {
      title: config.title,
      description: config.description,
      url,
    },
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Search;
}) {
  const { username } = await params;
  const resolved = await getRequestProfile(username, await searchParams);
  if (!resolved) notFound();

  return (
    <SiteProfileProvider
      mode="dynamic"
      routeUsername={resolved.username}
      initialProfile={resolved.profile}
      initialSource={resolved.source}
      profileReady={resolved.profileReady}
    >
      <SitePage />
    </SiteProfileProvider>
  );
}
