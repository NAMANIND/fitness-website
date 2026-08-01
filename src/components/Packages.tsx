import ContactButton from "@/components/ContactButton";
import { packages, sectionCopy } from "@/data/siteData";

export default function Packages() {
  return (
    <section
      id="pricing"
      className="section-padding bg-white"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal section-header">
          <h2 id="pricing-heading" className="section-heading text-black">
            Start Your Transformation Journey{" "}
            <span className="text-coral">Today</span>
          </h2>
          <p className="section-subheading">{sectionCopy.pricing.subheading}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`reveal relative flex flex-col rounded-2xl p-8 ${
                pkg.featured
                  ? "bg-black text-white"
                  : "border border-black/15 bg-white text-black"
              }`}
            >
              {pkg.badge && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {pkg.badge}
                </span>
              )}
              <p className="font-display text-3xl font-bold">{pkg.price}</p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase">
                {pkg.name}
              </h3>
              <p
                className={`mt-3 text-sm ${pkg.featured ? "text-white/70" : "text-black/60"}`}
              >
                {pkg.description}
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm ${pkg.featured ? "text-white/85" : "text-black/80"}`}
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
                  pkg.featured ? "btn-primary" : "btn-ghost"
                }`}
              >
                {pkg.cta}
              </ContactButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
