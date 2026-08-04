import { credibilityItems } from "@/data/siteData";

export default function CredibilityBar() {
  return (
    <div
      className="bg-[#1A1A1A] py-4 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white sm:text-[12px] sm:tracking-[0.18em] md:py-5.5 md:text-xs md:tracking-[0.22em]"
      aria-label="Credentials and achievements"
    >
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-1 px-4 font-semibold">
        {credibilityItems.map((item, index) => (
          <span
            key={item}
            className="inline-flex items-center gap-x-12 font-semibold"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[#C9A882]"
              ></span>
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
