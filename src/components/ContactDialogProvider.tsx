"use client";

import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { packages } from "@/data/siteData";

type ContactDialogContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
);

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error("useContactDialog must be used within ContactDialogProvider");
  }
  return context;
}

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openContact = useCallback(() => {
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setIsOpen(false);
    setSubmitted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const firstInput = dialogRef.current?.querySelector<HTMLElement>(
      "input, textarea, select, button",
    );
    firstInput?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeContact]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <ContactDialogContext.Provider value={{ openContact, closeContact }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={closeContact}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-warm-white shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-charcoal/10 bg-warm-white px-6 py-5">
              <div>
                <p className="section-eyebrow mb-1">Get in Touch</p>
                <h2
                  id="contact-dialog-title"
                  className="font-display text-2xl font-bold uppercase text-charcoal"
                >
                  Contact Me
                </h2>
              </div>
              <button
                type="button"
                onClick={closeContact}
                aria-label="Close dialog"
                className="rounded-full p-2 text-charcoal/60 transition hover:bg-charcoal/5 hover:text-charcoal"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <div className="rounded-2xl border border-coral/20 bg-coral/5 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-coral/10">
                    <svg
                      className="h-7 w-7 text-coral"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-display text-xl font-bold uppercase text-charcoal">
                    Message Sent!
                  </p>
                  <p className="mt-2 text-sm text-charcoal/70">
                    Thanks for reaching out. Sara will get back to you within
                    24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={closeContact}
                    className="btn-primary mt-6"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-sm leading-relaxed text-charcoal/70">
                    Tell me a bit about your goals and I&apos;ll reach out to
                    discuss the best program for you.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                      >
                        Phone <span className="normal-case text-charcoal/40">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-program"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                      >
                        Interested In
                      </label>
                      <select
                        id="contact-program"
                        name="program"
                        required
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      >
                        <option value="">Select a program</option>
                        {packages.map((pkg) => (
                          <option key={pkg.name} value={pkg.name}>
                            {pkg.name} — {pkg.price}
                          </option>
                        ))}
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
                      >
                        Your Goals
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell me about your fitness goals, experience level, and what you're looking for..."
                        className="w-full resize-none rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </ContactDialogContext.Provider>
  );
}
