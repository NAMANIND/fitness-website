"use client";

import ReelSlot from "@/components/ReelSlot";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function Shop() {
  const { shop } = useSiteProfile().profile;

  return (
    <section
      id="shop"
      className="pt-20 pb-10 md:pt-28 md:pb-16 bg-black"
      aria-labelledby="shop-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal section-header">
          <h2 id="shop-heading" className="section-heading-big">
            <span className="text-coral">shop</span>{" "}
            <span className="text-white">MY FITS</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {shop.items.map((item, index) => (
            <div key={item.instagramUrl ?? item.video ?? item.poster ?? index} className="reveal">
              <ReelSlot item={item} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="font-section text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
            Use code <span className="text-coral">{shop.promoCode}</span> for{" "}
            {shop.discount}
          </p>
          <a
            href={shop.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex px-20 py-5 text-2xl font-bold uppercase tracking-tight"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
