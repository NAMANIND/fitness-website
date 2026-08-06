import ReelVideo from "@/components/ReelVideo";
import {
  shopPromoCode,
  supplementCtaUrl,
  supplementItems,
} from "@/data/siteData";

export default function Supplements() {
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
          {supplementItems.map((item) => (
            <div key={item.video} className="reveal">
              <ReelVideo src={item.video} poster={item.poster} alt={item.alt} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="text-5xl text-white md:text-6xl font-bold font-section tracking-tight">
            USE CODE{" "}
            <span className="font-bold text-coral">{shopPromoCode}</span>
          </p>
          <a
            href={supplementCtaUrl}
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
