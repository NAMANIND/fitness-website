"use client";

import ContactButton from "@/components/ContactButton";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-charcoal/10 bg-white/95 p-3 backdrop-blur-md md:hidden">
      <ContactButton className="btn-primary w-full">
        Get Started
      </ContactButton>
    </div>
  );
}
