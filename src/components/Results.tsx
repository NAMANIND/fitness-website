import Image from "next/image";
import Link from "next/link";
import { clientResults } from "@/data/siteData";

export default function Results() {
  return (
    <section
      id="results"
      className="bg-charcoal py-24 md:py-32"
      aria-labelledby="results-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow text-rose-gold">Client Results</p>
            <h2
              id="results-heading"
              className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Real Women.
              <br />
              Real Results.
            </h2>
          </div>
          <Link
            href="#results"
            className="text-sm font-semibold uppercase tracking-wider text-coral hover:text-coral-hover"
          >
            View More Results →
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {clientResults.map((result) => (
            <article
              key={result.name}
              className="reveal overflow-hidden rounded-3xl bg-white/5"
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={result.beforeImage}
                    alt={`${result.name} before transformation`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute left-2 top-2 rounded bg-charcoal/80 px-2 py-0.5 text-xs font-bold uppercase text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/4]">
                  <Image
                    src={result.afterImage}
                    alt={`${result.name} after ${result.duration} of coaching`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute left-2 top-2 rounded bg-coral px-2 py-0.5 text-xs font-bold uppercase text-white">
                    After
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    {result.name}
                  </h3>
                  <span className="text-xs font-medium uppercase tracking-wide text-rose-gold">
                    {result.duration}
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
