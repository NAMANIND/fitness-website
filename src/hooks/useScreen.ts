"use client";

import { useEffect, useState } from "react";

export function useScreen() {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);

    update();
    setMounted(true);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return { isMobile, mounted };
}
