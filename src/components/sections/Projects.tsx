"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/Projects";
import ProjectCard from "@/components/ui/ProjectCard";

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

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id='projects'
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
          03 — Projects
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
          Things I&apos;ve built.
        </motion.h2>

        <motion.div
          variants={STAGGER}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
            gap: "2px",
          }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.num}
              variants={FADE_UP}
              style={{ gridColumn: project.featured ? "1 / -1" : "auto" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
