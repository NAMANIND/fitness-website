export const PREVIEW_SECTION_TARGETS: Record<string, string> = {
  brand: "home",
  seo: "home",
  hero: "home",
  credibility: "credibility",
  programs: "programs",
  about: "about",
  testimonials: "testimonials",
  packages: "pricing",
  shop: "shop",
  supplements: "supplements",
  finalCta: "final-cta",
  instagram: "instagram",
};

export function previewScrollTarget(sectionId: string) {
  return PREVIEW_SECTION_TARGETS[sectionId] ?? "home";
}
