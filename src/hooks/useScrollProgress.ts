"use client";

import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Returns a MotionValue (0–1) tracking scroll progress
 * down the entire page. Attach to a scaleX transform on
 * the progress bar element.
 */
export function useScrollProgress() {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(docH > 0 ? window.scrollY / docH : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scaleX]);

  return scaleX;
}
