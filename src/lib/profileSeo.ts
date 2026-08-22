import { profileTemplate } from "@/data/profileTemplate";
import type { SiteProfile } from "@/lib/profile";
import { absoluteUrl } from "@/lib/seo";

export function profileSiteConfig(profile: SiteProfile = profileTemplate) {
  return {
    name: profile.brand.name,
    title: profile.seo.title,
    description: profile.seo.description,
    locale: profile.seo.locale,
    instagram: profile.seo.instagram,
    instagramUrl: profile.seo.instagramUrl,
    email: profile.seo.email,
    keywords: profile.seo.keywords,
  };
}

export function profileAbsoluteUrl(username: string, path = "") {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return absoluteUrl(`/${username}${normalized}`);
}
