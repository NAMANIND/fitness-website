"use client";

import { useRef, useState } from "react";
import { OnScrollSlider } from "@/components/OnScrollSlider";
import { ProgramsCarouselCard } from "@/components/ProgramsCarouselCard";
import { useScreen } from "@/hooks/useScreen";
import { exercisePrograms, sectionCopy } from "@/data/siteData";

export default function Programs() {
  const { isMobile } = useScreen();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="programs"
      className="relative z-10 bg-white pt-et"
      aria-labelledby="programs-heading"
      ref={sectionRef}
    >
      <div className="mx-auto max-h-[99vh] w-full overflow-hidden">
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
          {isMobile ? (
            <div className="relative w-full">
              <div
                ref={carouselRef}
                className="no-scrollbar flex snap-x snap-mandatory scroll-smooth gap-1 overflow-x-auto px-4"
                onScroll={(event) => {
                  const target = event.currentTarget;
                  const next = Math.round(
                    target.scrollLeft / target.clientWidth,
                  );
                  if (next !== activeIndex) setActiveIndex(next);
                }}
              >
                {exercisePrograms.map((program) => (
                  <div key={program.title} className="shrink-0">
                    <div className="px-1">
                      <ProgramsCarouselCard
                        program={program}
                        className="mx-auto w-80 lg:w-96"
                        imageClassName="h-[350px] lg:h-[450px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center">
                <div className="relative h-0.5 w-[80%] overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gray-900 transition-all duration-300 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / exercisePrograms.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <OnScrollSlider
              items={[...exercisePrograms]}
              className="h-full w-full"
              containerRef={sectionRef}
              scrubValue={1}
              ease="none"
            />
          )}
        </div>
      </div>
    </section>
  );
}
