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
          <p className="text-base text-white md:text-lg">
            Use code{" "}
            <span className="font-bold text-coral">{shopPromoCode}</span> for{" "}
            <span className="font-bold">{shopDiscount}</span>
          </p>
          <a
            href={shopCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex px-10 py-4"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
