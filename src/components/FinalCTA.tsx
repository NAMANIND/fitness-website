import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { scarcityMessage } from "@/data/siteData";

export default function FinalCTA() {
  return (
    <section
      className="bg-coral py-20 md:py-28"
      aria-labelledby="final-cta-heading"
    >
      <div className="reveal mx-auto max-w-4xl px-4 text-center md:px-8">
        <h2
          id="final-cta-heading"
          className="font-display text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl lg:text-6xl"
        >
          Ready to Start Your Transformation?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
          Spots fill fast. If you&apos;re serious about building strength,
          confidence, and a body that matches your ambition — let&apos;s talk.
        </p>
        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-white/80">
          {scarcityMessage}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#programs"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-coral transition hover:-translate-y-0.5 hover:bg-warm-white"
          >
            View My Programs
          </Link>
          <ContactButton className="btn-ghost-light">
            Book a Call
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
