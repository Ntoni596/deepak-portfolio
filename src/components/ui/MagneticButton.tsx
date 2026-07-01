"use client";

import { motion } from "framer-motion";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "ghost";
  target?: string;
  rel?: string;
}

/**
 * A button/link that magnetically follows the cursor on hover.
 * Pass href for an anchor, onClick for a button.
 *
 * Usage:
 *   <MagneticButton href="#projects" variant="primary">
 *     View my work →
 *   </MagneticButton>
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.3,
  className,
  style,
  variant = "ghost",
  target,
  rel,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticEffect({
    strength,
  });

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    letterSpacing: "0.06em",
    padding: "14px 28px",
    borderRadius: "3px",
    cursor: "pointer",
    border: "none",
    transition: "background 0.2s, color 0.2s, border-color 0.2s",
    textDecoration: "none",
    ...(variant === "primary"
      ? { background: "var(--accent)", color: "#fff" }
      : { background: "transparent", border: "1px solid var(--border)", color: "var(--muted)" }),
    ...style,
  };

  // inline props applied to motion elements below

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        ref={ref as React.Ref<HTMLAnchorElement>}
        style={{ x, y, ...baseStyle }}
        className={className}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      style={{ x, y, ...baseStyle }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
