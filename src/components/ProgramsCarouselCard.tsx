import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import { exercisePrograms } from "@/data/siteData";

export type ExerciseProgram = (typeof exercisePrograms)[number];

export function ProgramsCarouselCard({
  program,
  className = "",
  imageClassName = "h-[350px] lg:h-[450px]",
}: {
  program: ExerciseProgram;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {program.isNew && (
        <span className="absolute left-5 top-0 z-20 -translate-y-1/2 rounded-full bg-coral px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white md:left-6">
          New
        </span>
      )}
      <div
        className={`relative overflow-hidden rounded-2xl group ${imageClassName}`}
      >
        <Image
          src={program.image}
          alt={`${program.title} workout program`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_44%,#000000_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-section text-2xl font-bold uppercase leading-tight text-white lg:text-3xl">
            {program.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white lg:text-base">
            {program.description}
          </p>
          {program.cta && (
            <ContactButton className="btn-ghost-light mt-4 w-fit border-coral px-8 py-2.5 text-xs font-semibold hover:bg-coral hover:text-white">
              {program.cta}
            </ContactButton>
          )}
        </div>
      </div>
    </div>
  );
}
