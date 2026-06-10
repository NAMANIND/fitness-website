"use client";

import ContactButton from "@/components/ContactButton";
import { InstagramIcon, EmailIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/seo";

export default function HeroSocialBar() {
  return (
    <div className="mt-8 flex flex-col gap-5 border-t border-charcoal/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Sara on Instagram ${siteConfig.instagram}`}
          className="group flex items-center gap-3 rounded-full border border-charcoal/10 bg-white px-4 py-2.5 transition hover:border-coral hover:shadow-md"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white">
            <InstagramIcon className="h-4 w-4" />
          </span>
          <span className="text-left">
            <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal/50">
              Instagram
            </span>
            <span className="block text-sm font-bold text-charcoal group-hover:text-coral">
              {siteConfig.instagram}
            </span>
          </span>
        </a>

        <a
          href={`mailto:${siteConfig.email}`}
          aria-label="Email Sara"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-white text-charcoal/70 transition hover:border-coral hover:text-coral hover:shadow-md"
        >
          <EmailIcon className="h-5 w-5" />
        </a>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs font-medium uppercase tracking-wider text-charcoal/50 sm:block">
          100K+ followers
        </span>
        <ContactButton className="btn-ghost text-sm">
          Contact Me
        </ContactButton>
      </div>
    </div>
  );
}
