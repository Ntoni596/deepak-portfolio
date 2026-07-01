"use client";

import { motion } from "framer-motion";

interface SkillTagProps {
  label: string;
  index?: number;
}

/**
 * Animated skill pill with hover colour shift and scale.
 * Staggers in based on index when wrapped in a motion parent.
 *
 * Usage:
 *   <SkillTag label="React" index={0} />
 */
export default function SkillTag({ label, index = 0 }: SkillTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.06 }}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--muted)",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid var(--border)",
        padding: "4px 10px",
        borderRadius: "2px",
        letterSpacing: "0.04em",
        cursor: "default",
        display: "inline-block",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--accent)";
        el.style.borderColor = "rgba(79,142,247,0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--muted)";
        el.style.borderColor = "var(--border)";
      }}
    >
      {label}
    </motion.span>
  );
}
