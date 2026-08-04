import Image from "next/image";
import {
  shopCtaUrl,
  shopDiscount,
  shopItems,
  shopPromoCode,
} from "@/data/siteData";

export default function Shop() {
  return (
    <section
      id="shop"
      className="section-padding bg-black"
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
          {shopItems.map((item, index) => (
            <div
              key={index}
              className="reveal relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="font-section text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
            Use code{" "}
            <span className="text-coral">{shopPromoCode}</span> for{" "}
            {shopDiscount}
          </p>
          <a
            href={shopCtaUrl}
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
