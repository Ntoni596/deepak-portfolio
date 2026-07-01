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

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Ntoni596",
    mono: "github.com/Ntoni596",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/deepakjoshinz",
    mono: "linkedin.com/in/deepakjoshinz",
  },
  {
    label: "Email",
    href: "mailto:joshi.rai.deepak@gmail.com",
    mono: "joshi.rai.deepak@gmail.com",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Divider */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      />

      <section
        id='contact'
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
          <motion.div variants={FADE_UP} className='section-label'>
            04 — Contact
          </motion.div>

          {/* Big heading */}
          <motion.h2
            variants={FADE_UP}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              marginBottom: "48px",
            }}
          >
            Let&apos;s work
            <br />
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
              }}
            >
              together.
            </span>
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            style={{
              color: "var(--text-2)",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.9,
              maxWidth: "480px",
              marginBottom: "52px",
            }}
          >
            I&apos;m currently open to frontend developer roles in Melbourne. If
            you&apos;re building something great and need someone who cares about the
            details, let&apos;s talk.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={FADE_UP} style={{ marginBottom: "60px" }}>
            <motion.a
              href='mailto:joshi.rai.deepak@gmail.com'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                letterSpacing: "0.06em",
                color: "#fff",
                background: "var(--accent)",
                padding: "16px 36px",
                borderRadius: "3px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              say hello →
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={STAGGER}
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              borderTop: "1px solid var(--border)",
              paddingTop: "40px",
            }}
          >
            {LINKS.map((link) => (
              <motion.a
                key={link.label}
                variants={FADE_UP}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel='noreferrer'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {link.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--muted)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {link.mono}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "32px var(--page-x)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--text)",
            }}
          >
            DJ<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--dim)",
              letterSpacing: "0.06em",
            }}
          >
            © 2026 Deepak Joshi · Built with Next.js
          </span>
        </div>
      </div>
    </>
  );
}
