import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { packages, scarcityMessage } from "@/data/siteData";

export default function Packages() {
  return (
    <section
      id="programs"
      className="bg-warm-white py-24 md:py-32"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Training Packages</p>
          <h2 id="programs-heading" className="section-heading">
            Choose Your Level
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            Every program is 100% personalized. Pick the level of support that
            matches where you are — and where you&apos;re going.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`reveal relative flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-xl ${
                pkg.popular
                  ? "border-2 border-coral bg-white shadow-lg ring-4 ring-coral/10"
                  : "border border-charcoal/10 bg-white"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-coral px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold uppercase text-charcoal">
                {pkg.name}
              </h3>
              <p className="mt-2 text-3xl font-bold text-coral">{pkg.price}</p>
              <p className="mt-3 text-sm text-charcoal/60">{pkg.description}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-charcoal/80"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <ContactButton
                className={`mt-8 w-full ${
                  pkg.popular ? "btn-primary" : "btn-ghost"
                }`}
              >
                {pkg.cta}
              </ContactButton>
            </article>
          ))}
        </div>

        <p className="reveal mt-10 text-center text-sm font-semibold uppercase tracking-wider text-coral">
          {scarcityMessage}
        </p>
      </div>
    </section>
  );
}
