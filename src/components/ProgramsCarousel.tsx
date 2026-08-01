"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContactButton from "@/components/ContactButton";
import { exercisePrograms } from "@/data/siteData";

function useVisibleCount() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setVisible(3);
      else if (window.matchMedia("(min-width: 640px)").matches) setVisible(2);
      else setVisible(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

function ProgramCard({
  program,
}: {
  program: (typeof exercisePrograms)[number];
}) {
  const isNight = program.theme === "night";

  return (
    <div className="relative px-2 md:px-3">
      {program.isNew && (
        <span className="absolute left-5 top-0 z-20 -translate-y-1/2 rounded-full bg-coral px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm md:left-6">
          New
        </span>
      )}
      <article className="group relative aspect-3/4 overflow-hidden rounded-xl">
        <Image
          src={program.image}
          alt={`${program.title} workout program`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className={
            isNight
              ? "absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10"
              : "absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent"
          }
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 md:p-5">
          <h3
            className={`font-display text-lg font-bold uppercase md:text-xl ${isNight ? "text-white" : "text-black"}`}
          >
            {program.title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${isNight ? "text-white/80" : "text-black/70"}`}
          >
            {program.description}
          </p>
          <ContactButton
            className={
              isNight
                ? "btn-ghost-light mt-1 w-fit border-coral px-6 py-2.5 text-xs hover:bg-coral hover:text-white"
                : "btn-ghost mt-1 w-fit border-coral px-6 py-2.5 text-xs text-coral hover:bg-coral hover:text-white hover:border-coral"
            }
          >
            {program.cta}
          </ContactButton>
        </div>
      </article>
    </div>
  );
}

export default function ProgramsCarousel() {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const visiblePrograms = useMemo(
    () =>
      Array.from({ length: visible }, (_, slot) => {
        const program =
          exercisePrograms[(index + slot) % exercisePrograms.length];
        return { program, slot };
      }),
    [index, visible],
  );

  const advance = useCallback((direction: 1 | -1) => {
    setAnimating(true);
    setIndex((current) =>
      direction === 1
        ? (current + 1) % exercisePrograms.length
        : (current - 1 + exercisePrograms.length) % exercisePrograms.length,
    );
    window.setTimeout(() => setAnimating(false), 400);
  }, []);

  const goNext = useCallback(() => advance(1), [advance]);
  const goPrev = useCallback(() => advance(-1), [advance]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => advance(1), 4500);
    return () => window.clearInterval(timer);
  }, [advance, paused]);

  return (
    <div
      className="relative pt-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={`grid gap-0 transition-opacity duration-300 ${
          visible === 1
            ? "grid-cols-1"
            : visible === 2
              ? "grid-cols-2"
              : "grid-cols-3"
        } ${animating ? "opacity-90" : "opacity-100"}`}
      >
        {visiblePrograms.map(({ program, slot }) => (
          <div
            key={`${index}-${program.title}-${slot}`}
            className={
              slot === 0 && animating
                ? "animate-[carousel-shift_0.4s_ease-out]"
                : ""
            }
          >
            <ProgramCard program={program} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition hover:border-coral hover:text-coral md:-left-5 md:h-12 md:w-12"
        aria-label="Previous programs"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition hover:border-coral hover:text-coral md:-right-5 md:h-12 md:w-12"
        aria-label="Next programs"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
