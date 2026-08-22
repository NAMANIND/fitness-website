"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ContactButton from "@/components/ContactButton";
import SiteImage from "@/components/SiteImage";
import { useSiteProfile } from "@/components/SiteProfileProvider";
import { proxyImageUrl } from "@/lib/imageProxy";

function isRemoteSrc(src: string) {
  return /^https?:\/\//.test(src);
}

function HeroImage({
  src,
  fallbacks,
  alt,
}: {
  src: string;
  fallbacks: string[];
  alt: string;
}) {
  const [current, setCurrent] = useState(src);
  const display = proxyImageUrl(current);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  const bump = () => {
    const chain = [src, ...fallbacks.filter((item) => item !== src)];
    setCurrent((value) => {
      const index = chain.indexOf(value);
      return index >= 0 && index + 1 < chain.length ? chain[index + 1]! : value;
    });
  };

  if (!display) {
    return <div className="absolute inset-0 bg-charcoal" aria-hidden />;
  }

  if (isRemoteSrc(current) || display.startsWith("/api/image")) {
    return (
      <img
        src={display}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={bump}
        className="absolute inset-0 h-full w-full object-cover object-[72%_28%]"
      />
    );
  }

  return (
    <SiteImage
      src={display}
      alt={alt}
      fill
      priority
      onError={bump}
      className="object-cover object-[72%_28%]"
      sizes="100vw"
    />
  );
}

function HeroContent() {
  const { profile, href } = useSiteProfile();
  const { hero } = profile;
  return (
    <div className="reveal max-w-2xl">
      <h1 id="hero-heading" className="hero-heading text-white">
        {hero.heading.line1}{" "}
        <span className="text-coral">{hero.heading.accent}</span>
        <br />
        {hero.heading.line2}
        <br />
        {hero.heading.line3}
      </h1>
      <p className="mt-[clamp(1rem,3vw,1.5rem)] max-w-lg text-[clamp(0.875rem,2.5vw,1.125rem)] leading-relaxed text-white/85 md:mt-6 md:text-lg">
        {hero.subtext}
      </p>
      <div className="mt-[clamp(1.25rem,4vw,2rem)] flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8">
        <Link href={href(hero.primaryCta.href)} className="btn-primary">
          {hero.primaryCta.label}
        </Link>
        <ContactButton className="btn-ghost-light">
          {hero.secondaryCta.label}
        </ContactButton>
      </div>
      <p className="mt-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.75rem,2vw,0.875rem)] text-white/80 md:mt-6 md:text-sm">
        {hero.socialProof}
      </p>
    </div>
  );
}

export default function Hero() {
  const { profile } = useSiteProfile();
  const heroSrc = profile.images.hero?.trim() ?? "";
  const fallbacks = useMemo(
    () =>
      [...new Set(profile.instagramTiles.filter((src) => src?.trim() && src !== heroSrc))],
    [profile.instagramTiles, heroSrc],
  );
  const alt = `${profile.brand.name} training`;

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full bg-charcoal"
      aria-labelledby="hero-heading"
    >
      <HeroImage src={heroSrc} fallbacks={fallbacks} alt={alt} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 md:hidden" />
      <div className="absolute inset-0 hidden bg-black/5 md:block" />
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-[var(--page-gutter)] pb-[clamp(1.5rem,6vw,2.5rem)] pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))] md:justify-center md:pb-16 md:pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))]">
        <div className="mx-auto w-full max-w-7xl md:px-6">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
