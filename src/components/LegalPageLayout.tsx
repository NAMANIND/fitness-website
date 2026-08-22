import Link from "next/link";

export const LEGAL_CONTACT_EMAIL = "hello@example.com";

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy", key: "privacy" as const },
  { label: "Terms of Service", href: "/terms", key: "terms" as const },
];

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  current: "privacy" | "terms";
  children: React.ReactNode;
};

const shellClass = "mx-auto w-full max-w-3xl px-[var(--page-gutter)] md:px-8";

export default function LegalPageLayout({
  title,
  lastUpdated,
  current,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-warm-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal pt-[env(safe-area-inset-top,0px)]">
        <div
          className={`${shellClass} flex h-[var(--nav-height)] items-center justify-between gap-6`}
        >
          <Link
            href="/"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Home
          </Link>

          <nav aria-label="Legal pages">
            <ul className="flex items-center gap-4 sm:gap-6">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current === link.key ? "page" : undefined}
                    className={`text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm sm:normal-case sm:tracking-normal ${
                      current === link.key
                        ? "text-coral"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center">
        <main className={`${shellClass} py-12 md:py-20`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            Legal
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight text-charcoal md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-charcoal/55">
            Last updated: {lastUpdated}
          </p>

          <div className="mt-12 space-y-10 text-charcoal/80 md:mt-14 md:space-y-12">
            {children}
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-charcoal/10 pt-10 md:mt-16">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <Link
                href={current === "privacy" ? "/terms" : "/privacy"}
                className="font-semibold text-charcoal transition hover:text-charcoal/70"
              >
                {current === "privacy" ? "Terms of Service" : "Privacy Policy"}
              </Link>
              <Link
                href="/"
                className="text-charcoal/60 transition hover:text-charcoal"
              >
                Back to Home
              </Link>
            </div>
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}`}
              className="text-sm font-semibold text-charcoal transition hover:text-charcoal/70"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>
          </div>
        </main>
      </section>
    </div>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold uppercase text-charcoal md:text-xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed md:text-[1.05rem] md:leading-7">
        {children}
      </div>
    </section>
  );
}

export { LegalSection };
