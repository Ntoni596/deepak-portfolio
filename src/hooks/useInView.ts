"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseInViewOptions {
  /** Trigger once and never reset, default true */
  once?: boolean;
  /** Root margin e.g. '-100px', default '-80px' */
  margin?: string;
  /** Intersection threshold 0–1, default 0.1 */
  threshold?: number;
}

/**
 * Lightweight wrapper around IntersectionObserver.
 * Returns [ref, inView] — attach ref to the element you want to watch.
 *
 * Usage:
 *   const [ref, inView] = useInView({ once: true, margin: '-100px' })
 *   <div ref={ref}>{inView ? 'visible' : 'hidden'}</div>
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  margin = "-80px",
  threshold = 0.1,
}: UseInViewOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin, threshold]);

  return [ref, inView];
}
