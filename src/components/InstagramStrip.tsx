import Image from "next/image";
import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { instagramTiles } from "@/data/siteData";
import { siteConfig } from "@/lib/seo";

export default function InstagramStrip() {
  return (
    <section
      className="bg-pale-beige py-16 md:py-20"
      aria-labelledby="instagram-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-coral">
              Daily Motivation
            </p>
            <h2 id="instagram-heading" className="section-heading text-black">
              Follow The Journey
            </h2>
          </div>
          <ContactButton>Follow @fitsarax</ContactButton>
        </div>

        <div className="reveal grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {instagramTiles.map((src, index) => (
            <Link
              key={src}
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
              aria-label={`View Sara's Instagram post ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Sara Fiorvento fitness content on Instagram — photo ${index + 1}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
