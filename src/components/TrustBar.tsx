import { trustBadges } from "@/data/siteData";

export default function TrustBar() {
  return (
    <section
      aria-label="Credentials and recognition"
      className="border-y border-charcoal/10 bg-charcoal py-5"
    >
      <div className="reveal mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 md:px-8">
        {trustBadges.map((badge, index) => (
          <span key={badge} className="flex items-center gap-8">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/90 md:text-sm">
              {badge}
            </span>
            {index < trustBadges.length - 1 && (
              <span
                className="hidden h-1 w-1 rounded-full bg-rose-gold md:block"
                aria-hidden="true"
              />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
