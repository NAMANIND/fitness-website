"use client";

import { useEffect, useRef, useState } from "react";
import ContactButton from "@/components/ContactButton";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function Packages() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const { profile } = useSiteProfile();
  const packages = profile.packages;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCardsVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

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
          <p className="section-subheading">{profile.sectionCopy.pricing.subheading}</p>
        </div>

        <div
          ref={gridRef}
          className={`reveal grid gap-4 sm:grid-cols-3 sm:gap-5 ${cardsVisible ? "visible" : ""}`}
          role="radiogroup"
          aria-label="Choose a billing plan"
        >
          {packages.map((pkg, index) => {
            const selected = selectedIndex === index;

            return (
              <button
                key={pkg.name}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedIndex(index)}
                className={`relative flex min-h-62 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 px-6 py-10 text-center transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                  selected
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black hover:border-black/30"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {pkg.badge}
                  </span>
                )}
                <p className="text-4xl leading-none font-extrabold md:text-5xl">
                  {pkg.price}
                </p>
                <p
                  className={`mt-2 text-xl transition-colors duration-300 ease-in-out motion-reduce:transition-none ${selected ? "text-white/80" : "text-black/70"}`}
                >
                  {pkg.billing}
                </p>
              </button>
            );
          })}
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
