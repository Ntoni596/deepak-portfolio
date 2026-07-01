"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Thin gradient bar pinned to the top of the viewport.
 * Grows from left to right as the user scrolls down.
 *
 * Drop it anywhere inside a client layout — it reads window.scrollY directly.
 *
 * Usage:
 *   <ScrollProgress />
 */
export default function ScrollProgress() {
  const scaleX = useScrollProgress();

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
        scaleX,
        transformOrigin: "left",
        zIndex: 9997,
      }}
    />
  );
}
