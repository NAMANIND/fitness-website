"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/siteData";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="bg-charcoal py-24 md:py-32"
      aria-labelledby="testimonials-heading"
      aria-live="polite"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="reveal text-center">
          <p className="section-eyebrow text-rose-gold">Testimonials</p>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl"
          >
            What Clients Say
          </h2>
        </div>

        <div className="reveal relative mt-12 min-h-[280px]">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.name}
              className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-500 ${
                index === active
                  ? "translate-x-0 opacity-100"
                  : "pointer-events-none translate-x-4 opacity-0"
              }`}
            >
              <div className="mb-2 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-coral"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <cite className="font-display text-lg font-bold uppercase not-italic text-white">
                  {testimonial.name}
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              aria-label={`Show testimonial from ${testimonial.name}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === active
                  ? "w-8 bg-coral"
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
