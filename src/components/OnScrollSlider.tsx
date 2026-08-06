"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ProgramsCarouselCard,
  type ExerciseProgram,
} from "@/components/ProgramsCarouselCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  items: ExerciseProgram[];
  className?: string;
  containerClassName?: string;
  panelClassName?: string;
  scrubValue?: number;
  ease?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  sidePaddingVW?: number;
}

function HorizontalScroll({
  items,
  className = "",
  containerClassName = "container",
  panelClassName = "panel",
  scrubValue = 1,
  ease = "none",
  containerRef,
  sidePaddingVW = 4,
}: HorizontalScrollProps) {
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef?.current || !panelsRef.current) return;

    const container = containerRef.current;
    const panels = panelsRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const styles = window.getComputedStyle(container);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingRight = parseFloat(styles.paddingRight) || 180;
      const visibleWidth = container.clientWidth - paddingLeft - paddingRight;
      const totalContentWidth = panels.scrollWidth;
      const scrollDistance = Math.max(0, totalContentWidth - visibleWidth);

      gsap.set(panels, { x: 0 });

      const animation = gsap.to(panels, {
        x: -scrollDistance,
        ease,
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: scrubValue,
          end: `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 0,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        animation.kill();
        gsap.set(panels, { x: 0 });
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    });

    return () => mm.revert();
  }, [items.length, scrubValue, ease, sidePaddingVW, containerRef]);

  return (
    <div
      className={`${containerClassName} ${className}`}
      ref={containerRef}
      style={{
        paddingLeft: `${sidePaddingVW}vw`,
      }}
    >
      <div className="flex" ref={panelsRef}>
        {items.map((program) => (
          <div
            key={program.title}
            className={`${panelClassName} w-1/3 shrink-0`}
          >
            <div className="w-full px-4">
              <ProgramsCarouselCard
                program={program}
                className="mx-auto"
                imageClassName="h-[60vh]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ScrollVelocityProps {
  items?: ExerciseProgram[];
  className?: string;
  containerClassName?: string;
  panelClassName?: string;
  scrubValue?: number;
  ease?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  sidePaddingVW?: number;
}

export const OnScrollSlider = ({
  items = [],
  className = "",
  containerClassName = "container",
  panelClassName = "panel",
  scrubValue = 1,
  ease = "none",
  containerRef,
  sidePaddingVW = 5,
}: ScrollVelocityProps) => {
  return (
    <section className="space-y-4">
      <HorizontalScroll
        items={items}
        className={className}
        containerClassName={containerClassName}
        panelClassName={panelClassName}
        scrubValue={scrubValue}
        ease={ease}
        containerRef={containerRef}
        sidePaddingVW={sidePaddingVW}
      />
    </section>
  );
};
