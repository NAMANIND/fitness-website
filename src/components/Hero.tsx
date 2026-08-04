import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { heroContent, images } from "@/data/siteData";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mt-[72px] w-full"
      aria-labelledby="hero-heading"
    >
      <Image
        src={images.hero}
        alt="Female fitness model training in a gym"
        width={1428}
        height={833}
        priority
        className="h-auto w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/5" />

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="reveal max-w-2xl">
            <h1 id="hero-heading" className="hero-heading text-white">
              {heroContent.heading.line1}{" "}
              <span className="text-coral">{heroContent.heading.accent}</span>
              <br />
              {heroContent.heading.line2}
              <br />
              {heroContent.heading.line3}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 md:text-lg">
              {heroContent.subtext}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={heroContent.primaryCta.href} className="btn-primary">
                {heroContent.primaryCta.label}
              </Link>
              <ContactButton className="btn-ghost-light">
                {heroContent.secondaryCta.label}
              </ContactButton>
            </div>
            <p className="mt-6 text-sm text-white/80">
              {heroContent.socialProof}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
