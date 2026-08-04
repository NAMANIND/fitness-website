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

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`reveal relative flex min-h-62 flex-col items-center justify-center rounded-3xl px-6 py-10 text-center ${
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
              <p className=" text-4xl font-extrabold md:text-5xl leading-none">
                {pkg.price}
              </p>
              <p
                className={`mt-2 text-xl ${pkg.featured ? "text-white/80" : "text-black/70"}`}
              >
                {pkg.billing}
              </p>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center">
          <ContactButton className="btn-primary min-w-[min(100%,28rem)] px-20 py-5 text-xl font-bold tracking-wide md:px-28 md:py-6 md:text-2xl">
            Get Started
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
