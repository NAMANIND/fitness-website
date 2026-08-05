"use client";

import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { InstagramIcon } from "@/components/SocialIcons";
import {
  footerLegalLinks,
  footerNavLinks,
  footerTagline,
} from "@/data/siteData";
import { siteConfig } from "@/lib/seo";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link
              href="/#home"
              className="font-display text-3xl font-bold uppercase text-white"
            >
              Sara<span className="text-coral">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {footerTagline}
            </p>
            <ContactButton className="mt-6">Contact Us</ContactButton>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {footerNavLinks.map((link) => (
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
              {footerLegalLinks.map((link) => (
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
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <Link
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Sara on Instagram"
            className="text-white/40 transition hover:text-coral"
          >
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}
