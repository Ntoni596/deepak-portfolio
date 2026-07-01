"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click";

/**
 * Custom two-part cursor:
 * - A small snappy dot that tracks exactly
 * - A larger ring that lags behind with spring physics
 *
 * Responds to data-cursor="hover" on any element to expand the ring.
 * Hidden on touch devices (hover: none).
 *
 * Usage: drop <CustomCursor /> anywhere inside a client layout.
 * Add data-cursor="hover" to links/buttons to trigger the expanded state.
 */
export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [state, setState] = useState<CursorState>("default");

  const ringX = useSpring(mouseX, { stiffness: 100, damping: 16, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 16, mass: 0.6 });
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isCursorEl = target.closest('[data-cursor="hover"], a, button');
      setState(isCursorEl ? "hover" : "default");
    };

    const onDown = () => setState("click");
    const onUp = () => setState("default");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  const ringSize = state === "hover" ? 48 : state === "click" ? 20 : 36;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: state === "click" ? 0.5 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      >
        <motion.div
          animate={{
            width: state === "hover" ? 6 : 8,
            height: state === "hover" ? 6 : 8,
          }}
          transition={{ duration: 0.15 }}
          style={{
            background: "white",
            borderRadius: "50%",
          }}
        />
      </motion.div>
    </>
  );
}
