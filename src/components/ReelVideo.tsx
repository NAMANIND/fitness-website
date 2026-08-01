"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
        <Image src={poster} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
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
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {muted && (
        <span
          className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        >
          Tap to unmute
        </span>
      )}
    </div>
  );
}
