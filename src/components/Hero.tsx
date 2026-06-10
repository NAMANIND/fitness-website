import Image from "next/image";
import Link from "next/link";
import HeroSocialBar from "@/components/HeroSocialBar";
import { InstagramIcon } from "@/components/SocialIcons";
import { images, socialProof } from "@/data/siteData";
import { siteConfig } from "@/lib/seo";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-warm-white pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl min-h-[calc(100vh-6rem)] items-center gap-12 px-4 py-12 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="reveal flex flex-col justify-center">
          <p className="section-eyebrow">NASM Certified · @fitsarax</p>
          <h1
            id="hero-heading"
            className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal md:text-6xl lg:text-7xl"
          >
            Strong Looks Good{" "}
            <span className="text-coral">On You.</span>
            <br />
            Let&apos;s Build It Your Way.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">
            I&apos;m Sara — online coach for women who are done with
            cookie-cutter plans. Real programming. Real accountability. Real
            life included.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="#programs" className="btn-primary">
              View My Programs
            </Link>
            <Link href="#free-workout" className="btn-ghost">
              Get a Free Workout
            </Link>
          </div>
          <p className="mt-8 text-sm font-medium text-charcoal/60">
            {socialProof}
          </p>
          <HeroSocialBar />
        </div>

        <div className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-[min(80vh,720px)]">
          <Image
            src={images.hero}
            alt="Sara Fiorvento demonstrating a strength training exercise in a modern gym"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm transition hover:scale-105"
            aria-label={`Follow Sara on Instagram ${siteConfig.instagram}`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white">
              <InstagramIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-bold text-charcoal">
              {siteConfig.instagram}
            </span>
          </a>
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <p className="font-display text-lg font-bold uppercase text-white">
              Train smarter. Live fuller.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
