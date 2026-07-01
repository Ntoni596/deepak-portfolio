"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  /** Text to animate */
  text: string;
  /** 'letters' staggers each character, 'words' staggers each word */
  mode?: "letters" | "words";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Additional className on the outer wrapper */
  className?: string;
  /** Inline style on the outer wrapper */
  style?: React.CSSProperties;
}

const CONTAINER = (delay: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
});

const ITEM = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Splits text into letters or words and staggers them in with a
 * clip-path reveal. Wrap in a motion.div with variants="visible"
 * to trigger from a parent, or it self-animates on mount.
 *
 * Usage (self-animating):
 *   <AnimatedText text="Hello world" mode="words" delay={0.2} />
 *
 * Usage (parent-controlled):
 *   <motion.div variants={parentVariants} initial="hidden" animate="visible">
 *     <AnimatedText text="Hello" />
 *   </motion.div>
 */
export default function AnimatedText({
  text,
  mode = "letters",
  delay = 0,
  className,
  style,
}: AnimatedTextProps) {
  const chunks = mode === "words" ? text.split(" ") : text.split("");

  return (
    <motion.span
      variants={CONTAINER(delay)}
      initial='hidden'
      animate='visible'
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap", ...style }}
    >
      {chunks.map((chunk, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span variants={ITEM} style={{ display: "inline-block" }}>
            {chunk}
            {mode === "words" && i < chunks.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
