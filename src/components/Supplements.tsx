"use client";

import ReelSlot from "@/components/ReelSlot";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function Supplements() {
  const { profile } = useSiteProfile();
  const { supplements, shop } = profile;

  return (
    <section
      id="supplements"
      className="pb-20 pt-10 md:pb-28 md:pt-16 bg-black"
      aria-labelledby="supplements-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal section-header">
          <h2 id="supplements-heading" className="section-heading-big">
            <span className="text-coral">supplements</span>{" "}
            <span className="text-white">I USE</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {supplements.items.map((item, index) => (
            <div key={item.instagramUrl ?? item.video ?? item.poster ?? index} className="reveal">
              <ReelSlot item={item} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="text-5xl text-white md:text-6xl font-bold font-section tracking-tight">
            USE CODE{" "}
            <span className="font-bold text-coral">{shop.promoCode}</span>
          </p>
          <a
            href={supplements.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-invert mt-8 inline-flex px-20 py-5 text-2xl font-bold tracking-tight"
          >
            STOCK UP NOW
          </a>
        </div>
      </div>
    </section>
  );
}
