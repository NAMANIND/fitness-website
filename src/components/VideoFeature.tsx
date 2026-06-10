import { videoEmbedUrl } from "@/data/siteData";

export default function VideoFeature() {
  return (
    <section
      className="bg-warm-white py-24 md:py-32"
      aria-labelledby="video-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Meet Sara</p>
          <h2 id="video-heading" className="section-heading">
            See How I Coach
          </h2>
          <p className="mt-4 text-lg text-charcoal/70">
            Watch how I train, how I cue, and why my clients stick around long
            after they hit their first goal.
          </p>
        </div>

        <div className="reveal relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-3xl shadow-2xl">
          <iframe
            src={videoEmbedUrl}
            title="Meet Sara Fiorvento — Online Personal Trainer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
