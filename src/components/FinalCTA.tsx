"use client";

import ContactButton from "@/components/ContactButton";
import { useSiteProfile } from "@/components/SiteProfileProvider";

export default function FinalCTA() {
  const { profile } = useSiteProfile();

  return (
    <section
      id="final-cta"
      className="section-padding bg-white"
      aria-labelledby="final-cta-heading"
    >
      <div className="reveal mx-auto  max-w-7xl px-4 text-center md:px-8">
        <h2 id="final-cta-heading" className="section-heading text-black">
          Ready To Start Your <span className="text-coral">Transformation</span>
        </h2>
        <p className="section-subheading max-w-3xl mx-auto text-lg">
          {profile.sectionCopy.finalCta.subheading}
        </p>
        <p className="mt-6 text-xs font-bold uppercase tracking-widest text-black">
          {profile.scarcityMessage}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ContactButton className="px-8 py-4 btn-primary">
            View My Programs
          </ContactButton>
          <ContactButton className="btn-ghost px-8 py-3 normal-case">
            Book a Call
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
