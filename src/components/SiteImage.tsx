"use client";

import Image, { type ImageProps } from "next/image";
import { proxyImageUrl } from "@/lib/imageProxy";

export default function SiteImage({ priority, src, ...props }: ImageProps) {
  const raw = typeof src === "string" ? src : "";
  const display = raw ? proxyImageUrl(raw) : src;
  const remote = /^https?:\/\//.test(raw);
  return (
    <Image
      {...props}
      src={display}
      priority={priority}
      loading={priority ? "eager" : props.loading}
      unoptimized={remote || props.unoptimized}
    />
  );
}
