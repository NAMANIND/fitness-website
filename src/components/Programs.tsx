import ProgramsCarousel from "@/components/ProgramsCarousel";
import { sectionCopy } from "@/data/siteData";

export default function Programs() {
  return (
    <section
      id="programs"
      className="section-padding bg-white"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal section-header">
          <h2 id="programs-heading" className="section-heading text-black">
            Exercise Programs That Work For{" "}
            <span className="text-coral">You</span>
          </h2>
          <p className="section-subheading">{sectionCopy.programs.subheading}</p>
        </div>

        <div className="reveal px-6 md:px-10">
          <ProgramsCarousel />
        </div>
      </div>
    </section>
  );
}
