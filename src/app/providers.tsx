"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";

function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div className='cursor' style={{ x: ringX, y: ringY }}>
        <div className='cursor-ring' />
      </motion.div>
      <motion.div className='cursor' style={{ x: dotX, y: dotY }}>
        <div className='cursor-dot' />
      </motion.div>
    </>
  );
}

function ScrollProgress() {
  const scaleX = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(docH > 0 ? window.scrollY / docH : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scaleX]);

  return (
    <motion.div className='scroll-progress' style={{ scaleX, width: "100%" }} />
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className='noise-overlay' aria-hidden='true' />
      <div className='grid-overlay' aria-hidden='true' />
      <ScrollProgress />
      <CustomCursor />
      <main>{children}</main>
    </>
  );
}
