"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { proxyMediaUrl } from "@/lib/imageProxy";

type ReelVideoProps = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
};

export default function ReelVideo({
  src,
  poster,
  alt,
  className = "",
}: ReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [failed]);

  if (failed) {
    return (
      <div className={`relative aspect-9/16 overflow-hidden rounded-xl ${className}`}>
        <Image
          src={proxyMediaUrl(poster)}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className={`group relative aspect-9/16 overflow-hidden rounded-xl ${className}`}
      onClick={() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setMuted(video.muted);
      }}
      role="button"
      tabIndex={0}
      aria-label={muted ? `Unmute ${alt}` : `Mute ${alt}`}
    >
      <video
        ref={videoRef}
        src={proxyMediaUrl(src)}
        muted
        loop
        playsInline
        preload="metadata"
        poster={proxyMediaUrl(poster)}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />

      <span
        className={`pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition ${
          muted ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        {muted ? (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l-6 6M11 9l6 6" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072M12 6.5v11M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </span>
    </div>
  );
}
