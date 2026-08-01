import Image from "next/image";
import { aboutContent, aboutStats, images } from "@/data/siteData";

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-light-pink"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative aspect-4/5 overflow-hidden rounded-xl">
          <Image
            src={images.about}
            alt="Sara Fiorvento, fitness coach, posing in the gym"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="reveal flex h-full min-h-0 flex-col">
          <p className="text-sm font-bold uppercase tracking-widest text-coral">
            {aboutContent.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="section-heading break-words mt-3 text-black"
          >
            <span className="text-coral">{aboutContent.heading}</span>{" "}
            {aboutContent.headingAccent}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-black/75">
            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 text-sm font-medium text-coral">
            {aboutContent.tagline}
          </p>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-black/10 pt-8">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-bold text-coral md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-black/60 md:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
