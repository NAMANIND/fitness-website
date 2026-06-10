import { methodSteps } from "@/data/siteData";

const icons: Record<string, React.ReactNode> = {
  clipboard: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  chart: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  star: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

export default function Method() {
  return (
    <section
      className="bg-charcoal py-24 md:py-32"
      aria-labelledby="method-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow text-rose-gold">The Method</p>
          <h2
            id="method-heading"
            className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            How We Get You There
          </h2>
          <p className="mt-4 text-lg text-white/70">
            No guesswork. No one-size-fits-all PDFs. A proven three-step
            process built around your body and your life.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {methodSteps.map((step) => (
            <li
              key={step.step}
              className="reveal group relative rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-coral/50 hover:bg-white/10"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-5xl font-bold text-coral/30">
                  {step.step}
                </span>
                <div className="text-coral">{icons[step.icon]}</div>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
