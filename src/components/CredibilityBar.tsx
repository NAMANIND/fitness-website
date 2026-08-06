import { credibilityItems } from "@/data/siteData";

function CredibilityList({
  items,
  ariaHidden,
}: {
  items: readonly string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-x-[clamp(1rem,4vw,2.5rem)]"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="inline-flex shrink-0 items-center gap-x-[clamp(1rem,4vw,2.5rem)] font-semibold"
        >
          {index > 0 && (
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full bg-rose-gold"
            />
          )}
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CredibilityBar() {
  return (
    <div
      className="bg-charcoal py-[clamp(0.875rem,2.5vw,1.25rem)] font-medium uppercase text-white md:text-center"
      style={{
        fontSize: "clamp(0.625rem, 2.2vw, 0.75rem)",
        letterSpacing: "clamp(0.12em, 0.4vw, 0.22em)",
      }}
      aria-label="Credentials and achievements"
    >
      <ul
        className="mx-auto hidden max-w-7xl flex-wrap items-center justify-center gap-x-[clamp(1rem,4vw,2.5rem)] gap-y-2 px-[var(--page-gutter)] md:flex"
      >
        {credibilityItems.map((item, index) => (
          <li
            key={item}
            className="inline-flex items-center gap-[clamp(1rem,4vw,2.5rem)] font-semibold"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-rose-gold"
              />
            )}
            {item}
          </li>
        ))}
      </ul>

      <div className="credibility-marquee overflow-hidden md:hidden">
        <div className="credibility-marquee-track flex w-max">
          <CredibilityList items={credibilityItems} />
          <CredibilityList items={credibilityItems} ariaHidden />
        </div>
      </div>
    </div>
  );
}
