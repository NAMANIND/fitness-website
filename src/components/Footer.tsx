"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import ContactButton from "@/components/ContactButton";
import { InstagramIcon, EmailIcon } from "@/components/SocialIcons";
import { footerTagline, navLinks } from "@/data/siteData";
import { siteConfig } from "@/lib/seo";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer id="contact" className="bg-charcoal py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="#home"
              className="font-display text-3xl font-bold uppercase text-white"
            >
              Sara<span className="text-coral">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {footerTagline}
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Sara on Instagram"
                className="text-white/60 transition hover:text-coral"
              >
                <InstagramIcon />
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                aria-label="Email Sara"
                className="text-white/60 transition hover:text-coral"
              >
                <EmailIcon />
              </Link>
            </div>
            <ContactButton className="btn-primary mt-6">
              Contact Me
            </ContactButton>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/70 transition hover:text-coral"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/70 transition hover:text-coral"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-white/60">
              Weekly training tips and motivation straight to your inbox.
            </p>
            {subscribed ? (
              <p className="mt-4 text-sm font-semibold text-coral">
                You&apos;re in! Check your inbox soon.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-4 space-y-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-coral focus:outline-none"
                />
                <button type="submit" className="btn-primary w-full">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
