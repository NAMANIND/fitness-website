"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ContactButton from "@/components/ContactButton";
import { navLinks } from "@/data/siteData";

const CHARCOAL = "#1A1A1A";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showSolidHeader = scrolled || menuOpen;

  const mobileMenu =
    mounted && menuOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[90] lg:hidden"
            style={{ backgroundColor: CHARCOAL }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-[88px]">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block border-b border-white/10 py-4 text-lg font-medium text-white transition hover:text-coral"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-6">
                  <ContactButton
                    className="btn-primary w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    Work With Me
                  </ContactButton>
                </li>
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-shadow duration-300 ${
          showSolidHeader ? "shadow-lg" : ""
        }`}
        style={{
          backgroundColor: showSolidHeader ? CHARCOAL : "transparent",
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
        >
          <Link
            href="#home"
            className={`font-display text-2xl font-bold uppercase tracking-wide transition-colors ${
              showSolidHeader ? "text-white" : "text-charcoal"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Sara<span className="text-coral">.</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-coral ${
                    showSolidHeader ? "text-white/90" : "text-charcoal/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <ContactButton>Work With Me</ContactButton>
          </div>

          <button
            type="button"
            className={`relative z-[101] lg:hidden ${
              showSolidHeader ? "text-white" : "text-charcoal"
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}
