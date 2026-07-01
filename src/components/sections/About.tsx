"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const STATS = [
  { number: "3+", label: "Years experience" },
  { number: "10+", label: "Projects shipped" },
  { number: "5+", label: "Tech stacks" },
  { number: "AU", label: "NZ citizen · Melb" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id='about'
      ref={ref}
      style={{
        padding: "120px var(--page-x)",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <motion.div
        variants={STAGGER}
        initial='hidden'
        animate={inView ? "visible" : "hidden"}
      >
        {/* Label */}
        <motion.div variants={FADE_UP} className='section-label'>
          01 — About
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={FADE_UP}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            marginBottom: "60px",
          }}
        >
          Who I am.
        </motion.h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "60px",
            alignItems: "start",
          }}
        >
          {/* Text */}
          <motion.div variants={STAGGER}>
            {[
              <>
                I&apos;m a Melbourne-based frontend developer with a background
                spanning{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                  production UI development, UX design, and digital marketing
                </strong>
                . I care about the details that most people don&apos;t notice but
                everyone feels — spacing, transitions, the moment a form
                validates correctly.
              </>,
              <>
                Currently at{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                  Aftershock PC Australia
                </strong>
                , a premium custom PC brand on a headless Shopify/Hydrogen and
                Remix stack. I build internal tooling in Next.js and Supabase,
                run A/B testing programs via Inteligems, and collaborate
                directly with developers on component architecture.
              </>,
              <>
                Previously at{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                  OOBE
                </strong>
                , delivering production frontend work across client engagements
                — translating Figma designs into responsive, accessible
                components. I hold a{" "}
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>
                  Diploma in Full Stack Development & UX Design
                </strong>{" "}
                from Yoobee College.
              </>,
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={FADE_UP}
                style={{
                  color: "var(--text-2)",
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.9,
                  marginBottom: "20px",
                }}
              >
                {text}
              </motion.p>
            ))}

            <motion.a
              variants={FADE_UP}
              href='mailto:joshi.rai.deepak@gmail.com'
              style={{
                display: "inline-block",
                marginTop: "12px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: "var(--accent)",
                borderBottom: "1px solid rgba(79,142,247,0.3)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(79,142,247,0.3)")
              }
            >
              joshi.rai.deepak@gmail.com →
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={STAGGER}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
            }}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={FADE_UP}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, var(--accent), transparent)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "42px",
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
