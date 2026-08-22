import type { SiteProfile } from "@/lib/profile";
import { saraProfile } from "@/data/saraProfile";

export const profileTemplate: SiteProfile = {
  ...saraProfile,
  username: "coach",
  brand: { ...saraProfile.brand },
  seo: { ...saraProfile.seo, keywords: [...saraProfile.seo.keywords] },
  images: { ...saraProfile.images },
  hero: {
    ...saraProfile.hero,
    heading: { ...saraProfile.hero.heading },
    primaryCta: { ...saraProfile.hero.primaryCta },
    secondaryCta: { ...saraProfile.hero.secondaryCta },
  },
  about: {
    ...saraProfile.about,
    paragraphs: [...saraProfile.about.paragraphs],
    stats: saraProfile.about.stats.map((stat) => ({ ...stat })),
  },
  programs: saraProfile.programs.map((program) => ({ ...program })),
  packages: saraProfile.packages.map((pkg) => ({ ...pkg })),
  testimonials: saraProfile.testimonials.map((item) => ({ ...item })),
  credibility: [...saraProfile.credibility],
  shop: {
    ...saraProfile.shop,
    items: saraProfile.shop.items.map((item) => ({ ...item })),
  },
  supplements: {
    ...saraProfile.supplements,
    items: saraProfile.supplements.items.map((item) => ({ ...item })),
  },
  instagramTiles: [...saraProfile.instagramTiles],
  sectionCopy: {
    programs: { ...saraProfile.sectionCopy.programs },
    pricing: { ...saraProfile.sectionCopy.pricing },
    finalCta: { ...saraProfile.sectionCopy.finalCta },
  },
};
