import Image from "next/image";
import { aboutStats, images } from "@/data/siteData";

export default function About() {
  return (
    <section
      id="about"
      className="bg-warm-white py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src={images.about}
            alt="Sara Fiorvento, online personal trainer, smiling after a workout"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="reveal">
          <p className="section-eyebrow">About Sara</p>
          <h2 id="about-heading" className="section-heading">
            Your Coach, Not Another Influencer
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/75 md:text-lg">
            <p>
              I started coaching because I was tired of watching women chase
              quick fixes that never lasted. After six years of training clients
              online and in person, I&apos;ve learned one truth: transformation
              happens when the plan fits your life — not the other way around.
            </p>
            <p>
              My approach blends evidence-based strength training with the
              accountability you&apos;d get from a friend who also happens to be
              your coach. No shame. No starvation. Just consistent progress toward
              a body and mindset you&apos;re proud of.
            </p>
            <p>
              Whether you&apos;re stepping into a gym for the first time or
              coming back after years away, I meet you exactly where you are.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal/10 pt-10">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-bold text-coral md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wide text-charcoal/60 md:text-sm">
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
