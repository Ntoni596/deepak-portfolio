"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const SKILL_GROUPS = [
  {
    icon: "⚡",
    title: "Frontend",
    tags: [
      "React",
      "Next.js",
      "Remix",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    icon: "🎨",
    title: "Design & UX",
    tags: [
      "Figma",
      "Adobe Photoshop",
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
  },
  {
    icon: "🛠",
    title: "Backend & Data",
    tags: ["Node.js", "Supabase", "PostgreSQL", "REST APIs", "SQL", "Lua"],
  },
  {
    icon: "☁️",
    title: "Platforms & Cloud",
    tags: [
      "Shopify/Hydrogen",
      "AWS Lightsail",
      "Vercel",
      "WordPress",
      "Git/GitHub",
      "VS Code",
    ],
  },
  {
    icon: "📈",
    title: "Marketing & CRO",
    tags: [
      "A/B Testing",
      "CRO",
      "SEO",
      "Google Analytics",
      "Inteligems",
      "Copywriting",
    ],
  },
  {
    icon: "🤝",
    title: "Collaboration",
    tags: [
      "Technical Consulting",
      "Cross-functional",
      "Customer Success",
      "Documentation",
      "Agile",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id='skills'
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
          02 — Skills
        </motion.div>

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
          What I work with.
        </motion.h2>

        <motion.div
          variants={STAGGER}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2px",
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.title}
              variants={FADE_UP}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "32px",
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
              <div style={{ fontSize: "22px", marginBottom: "14px" }}>
                {group.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "16px",
                  letterSpacing: "-0.02em",
                }}
              >
                {group.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
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
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
