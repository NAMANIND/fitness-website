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

const fieldClass =
  "w-full rounded-2xl border border-charcoal/10 bg-white px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/35 transition focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/15";

const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-wider text-charcoal/55";

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
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
            onClick={closeContact}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            className="relative z-10 flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
          >
            <div className="flex shrink-0 items-start justify-between border-b border-charcoal/8 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                  Work with Sara
                </p>
                <h2
                  id="contact-dialog-title"
                  className="mt-1 font-display text-2xl font-extrabold uppercase leading-tight text-charcoal sm:text-3xl"
                >
                  Let&apos;s Talk
                </h2>
              </div>
              <button
                type="button"
                onClick={closeContact}
                aria-label="Close dialog"
                className="rounded-full p-2.5 text-charcoal/50 transition hover:bg-charcoal/5 hover:text-charcoal"
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

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {submitted ? (
                <div className="rounded-2xl border border-coral/20 bg-coral/5 p-8 text-center">
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
                    You&apos;re on the list
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                    Sara will reach out within 24 hours to talk goals and find
                    the right fit.
                  </p>
                  <button
                    type="button"
                    onClick={closeContact}
                    className="btn-primary mt-6 w-full sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-sm leading-relaxed text-charcoal/65 sm:text-base">
                    Share a few details and Sara will follow up with next steps.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className={labelClass}>
                          Full Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jessica M."
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@email.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className={labelClass}>
                        Phone{" "}
                        <span className="font-medium normal-case text-charcoal/35">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Your phone number"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-program" className={labelClass}>
                        Interested In
                      </label>
                      <select
                        id="contact-program"
                        name="program"
                        required
                        className={fieldClass}
                      >
                        <option value="">Choose a plan</option>
                        {packages.map((pkg) => (
                          <option key={pkg.name} value={pkg.name}>
                            {pkg.name} — {pkg.price}
                          </option>
                        ))}
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className={labelClass}>
                        Your Goals
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        placeholder="What are you working toward? Any injuries, schedule limits, or experience I should know?"
                        className={`${fieldClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 text-base"
                    >
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
