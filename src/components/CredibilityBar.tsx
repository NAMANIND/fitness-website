import { credibilityItems } from "@/data/siteData";

export default function CredibilityBar() {
  return (
    <div
      className="bg-charcoal py-[clamp(0.875rem,2.5vw,1.25rem)] text-center font-medium uppercase text-white"
      style={{
        fontSize: "clamp(0.625rem, 2.2vw, 0.75rem)",
        letterSpacing: "clamp(0.12em, 0.4vw, 0.22em)",
      }}
      aria-label="Credentials and achievements"
    >
      <ul
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-[clamp(1rem,4vw,2.5rem)] gap-y-2 px-[var(--page-gutter)]"
      >
        {credibilityItems.map((item, index) => (
          <li key={item} className="inline-flex items-center gap-[clamp(1rem,4vw,2.5rem)] font-semibold">
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
    </div>
  );
}
