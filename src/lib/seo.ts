export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Sara Fiorvento",
  title: "Sara Fiorvento | Online Personal Trainer & Fitness Coach",
  description:
    "Train with NASM-certified coach Sara Fiorvento. Personalized online fitness programs for women who want real strength, confidence, and lasting results — no gimmicks.",
  locale: "en_US",
  instagram: "@fitsarax",
  instagramUrl: "https://www.instagram.com/fitsarax/",
  email: "hello@fitsarax.com",
  keywords: [
    "online personal trainer",
    "women's fitness coach",
    "Sara Fiorvento",
    "fitsarax",
    "online fitness coaching",
    "strength training for women",
    "home workout program",
    "NASM certified trainer",
  ],
} as const;

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
