"use client";

import { useRef, RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface MagneticOptions {
  /** How strongly the element follows the cursor. 0–1, default 0.3 */
  strength?: number;
  /** Spring stiffness, default 200 */
  stiffness?: number;
  /** Spring damping, default 20 */
  damping?: number;
}

interface MagneticReturn {
  ref: RefObject<HTMLElement | null>;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * Attach ref, x, y, onMouseMove, onMouseLeave to any element
 * to give it a magnetic cursor-follow effect.
 *
 * Usage:
 *   const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticEffect()
 *   <motion.div ref={ref} style={{ x, y }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 */
export function useMagneticEffect({
  strength = 0.3,
  stiffness = 200,
  damping = 20,
}: MagneticOptions = {}): MagneticReturn {
  const ref = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping });
  const y = useSpring(rawY, { stiffness, damping });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
