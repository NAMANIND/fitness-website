import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { heroContent, images } from "@/data/siteData";

function HeroContent() {
  return (
    <div className="reveal max-w-2xl">
      <h1 id="hero-heading" className="hero-heading text-white">
        {heroContent.heading.line1}{" "}
        <span className="text-coral">{heroContent.heading.accent}</span>
        <br />
        {heroContent.heading.line2}
        <br />
        {heroContent.heading.line3}
      </h1>
      <p className="mt-[clamp(1rem,3vw,1.5rem)] max-w-lg text-[clamp(0.875rem,2.5vw,1.125rem)] leading-relaxed text-white/85 md:mt-6 md:text-lg">
        {heroContent.subtext}
      </p>
      <div className="mt-[clamp(1.25rem,4vw,2rem)] flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8">
        <Link href={heroContent.primaryCta.href} className="btn-primary">
          {heroContent.primaryCta.label}
        </Link>
        <ContactButton className="btn-ghost-light">
          {heroContent.secondaryCta.label}
        </ContactButton>
      </div>
      <p className="mt-[clamp(1rem,3vw,1.5rem)] text-[clamp(0.75rem,2vw,0.875rem)] text-white/80 md:mt-6 md:text-sm">
        {heroContent.socialProof}
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full bg-charcoal"
      aria-labelledby="hero-heading"
    >
      <div className="relative min-h-[100dvh] w-full md:hidden">
        <Image
          src={images.hero}
          alt="Female fitness model training in a gym"
          fill
          priority
          className="object-cover object-[72%_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-[var(--page-gutter)] pb-[clamp(1.5rem,6vw,2.5rem)] pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))]">
          <div className="mx-auto w-full max-w-7xl">
            <HeroContent />
          </div>
        </div>
      </div>

      <div className="relative hidden w-full md:block">
        <Image
          src={images.hero}
          alt="Female fitness model training in a gym"
          width={1428}
          height={833}
          priority
          className="block h-auto w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-16">
            <HeroContent />
          </div>
        </div>
      </div>
    </section>
  );
}
