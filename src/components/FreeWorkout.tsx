"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { images } from "@/data/siteData";

export default function FreeWorkout() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="free-workout"
      className="bg-charcoal py-24 md:py-32"
      aria-labelledby="free-workout-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-3xl lg:order-2">
          <Image
            src={images.freeWorkout}
            alt="Woman performing a full-body workout exercise"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="reveal lg:order-1">
          <p className="section-eyebrow text-rose-gold">Free Download</p>
          <h2
            id="free-workout-heading"
            className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl"
          >
            Try Sara&apos;s Signature 20-Min Full-Body Burn — For Free
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "No gym required — dumbbells or bodyweight only",
              "Designed for all fitness levels with scaling options",
              "The exact warm-up and finisher Sara uses with clients",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-white/75"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-coral"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {submitted ? (
            <div className="mt-8 rounded-2xl border border-coral/30 bg-coral/10 p-6">
              <p className="font-semibold text-white">
                Check your inbox — your free workout is on the way!
              </p>
              <p className="mt-2 text-sm text-white/60">
                (Demo mode: connect an email provider to deliver automatically.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="workout-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60"
                >
                  Name
                </label>
                <input
                  id="workout-name"
                  type="text"
                  required
                  placeholder="Your first name"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-coral focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="workout-email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60"
                >
                  Email
                </label>
                <input
                  id="workout-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-coral focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Me The Workout
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
