"use client";

import { useRef, useState } from "react";
import { OnScrollSlider } from "@/components/OnScrollSlider";
import { ProgramsCarouselCard } from "@/components/ProgramsCarouselCard";
import { exercisePrograms, sectionCopy } from "@/data/siteData";

function ProgramsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full pt-4">
      <div
        ref={carouselRef}
        className="no-scrollbar flex snap-x snap-mandatory scroll-smooth overflow-x-auto overflow-y-visible"
        onScroll={(event) => {
          const target = event.currentTarget;
          const slideWidth = target.clientWidth;
          const next = Math.round(target.scrollLeft / slideWidth);
          if (next !== activeIndex) setActiveIndex(next);
        }}
      >
        {exercisePrograms.map((program) => (
          <div
            key={program.title}
            className="w-full shrink-0 snap-center px-[var(--page-gutter)]"
          >
            <ProgramsCarouselCard
              program={program}
              className="mx-auto w-full max-w-sm"
              imageClassName="h-[min(58vh,420px)]"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center px-[var(--page-gutter)]">
        <div className="relative h-0.5 w-full max-w-sm overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gray-900 transition-all duration-300 ease-out"
            style={{
              width: `${((activeIndex + 1) / exercisePrograms.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="programs"
      className="relative z-10 bg-white pt-et"
      aria-labelledby="programs-heading"
      ref={sectionRef}
    >
      <div className="mx-auto w-full md:max-h-[99vh] md:overflow-hidden">
        <div className="text-center">
          <h2
            id="programs-heading"
            className="section-heading pt-et text-black"
          >
            Exercise Programs That Work For{" "}
            <span className="text-coral">You</span>
          </h2>
          <p className="section-subheading -mt-1 text-black">
            {sectionCopy.programs.subheading}
          </p>
        </div>

        <div className="relative pt-12 pb-20">
          <div className="md:hidden">
            <ProgramsCarousel />
          </div>
          <div className="hidden md:block">
            <OnScrollSlider
              items={[...exercisePrograms]}
              className="h-full w-full"
              containerRef={sectionRef}
              scrubValue={1}
              ease="none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
