"use client";

import SiteImage from "@/components/SiteImage";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function About() {
  const { profile } = useSiteProfile();
  const { about, images, brand } = profile;

  return (
    <section
      id="about"
      className="section-padding bg-[#FFF7F9]"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative aspect-4/5 overflow-hidden rounded-xl">
          <SiteImage
            src={images.about}
            alt={`${brand.name}, fitness coach`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="reveal flex h-full min-h-0 flex-col">
          <p className="text-sm font-bold uppercase tracking-widest text-coral">
            {about.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="section-heading break-words mt-3 text-black"
          >
            <span className="text-coral">{about.heading}</span>
            <br />
            {about.headingAccent}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-black/75">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-auto gap-4 pt-8">
            <p className="text-lg font-light text-coral">{about.tagline}</p>
            <hr className="my-4 border-black/10" />
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-section text-2xl font-bold text-coral md:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-black/60 md:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
