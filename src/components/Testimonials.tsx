"use client";

import SiteImage from "@/components/SiteImage";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function Testimonials() {
  const { testimonials } = useSiteProfile().profile;

  return (
    <section
      id="testimonials"
      className="section-padding bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal section-header">
          <h2 id="testimonials-heading" className="section-heading text-coral">
            Trusted By People{" "}
            <span className="text-black">Around The World</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((result) => (
            <article
              key={result.name}
              className="reveal overflow-hidden rounded-3xl"
            >
              <div className="grid grid-cols-2 gap-1 bg-black">
                <div className="relative aspect-[3/4]">
                  <SiteImage
                    src={result.beforeImage}
                    alt={`${result.name} before transformation`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-black/80 px-2 py-0.5 text-xs font-bold uppercase text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4]">
                  <SiteImage
                    src={result.afterImage}
                    alt={`${result.name} after coaching`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-coral px-2 py-0.5 text-xs font-bold uppercase text-white">
                    After
                  </span>
                </div>
              </div>
              <div className="bg-black p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-section text-lg font-bold uppercase text-white">
                    {result.name}
                  </h3>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                    {result.weeks}
                  </span>
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-white/70">
                  &ldquo;{result.quote}&rdquo;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
