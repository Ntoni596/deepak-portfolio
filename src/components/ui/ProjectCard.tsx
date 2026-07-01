"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";
import GalleryModal from "./GalleryModal";

interface ProjectCardProps {
  project: Project;
}

/**
 * Individual project card with hover shimmer, animated arrow,
 * and optional external link. Featured projects span full width.
 * Projects with a `gallery` open a lightbox instead of navigating away.
 *
 * Usage:
 *   <ProjectCard project={project} />
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const hasGallery = !!project.gallery?.length;
  const cardPadding = "clamp(24px, 6vw, 40px)";

  return (
    <motion.div
      layout
      style={{
        gridColumn: project.featured ? "1 / -1" : "auto",
        height: "100%",
        boxSizing: "border-box",
        background: "var(--surface)",
        border: `1px solid ${hovered ? "rgba(79,142,247,0.35)" : "var(--border)"}`,
        padding: cardPadding,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s",
        cursor: project.link || hasGallery ? "pointer" : "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (hasGallery) setGalleryOpen(true);
        else if (project.link) window.open(project.link, "_blank");
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Top shimmer */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key='shimmer'
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
              transformOrigin: "left",
            }}
          />
        )}
      </AnimatePresence>

      {/* Thumbnail */}
      {project.image && (
        <div
          style={{
            position: "relative",
            margin: `calc(${cardPadding} * -1) calc(${cardPadding} * -1) 24px`,
            width: `calc(100% + ${cardPadding} * 2)`,
            height: project.featured ? 320 : 200,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes={project.featured ? "100vw" : "50vw"}
            priority={project.featured}
          />
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--dim)",
              letterSpacing: "0.15em",
              marginBottom: "8px",
              display: "flex",
              gap: "10px",
            }}
          >
            <span>{project.num}</span>
            {project.tag && (
              <>
                <span style={{ color: "var(--border)" }}>/</span>
                <span style={{ color: "var(--accent)" }}>{project.tag}</span>
              </>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: project.featured ? "26px" : "20px",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              marginTop: "4px",
            }}
          >
            {project.company}
          </div>
        </div>

        {(project.link || hasGallery) && (
          <motion.div
            animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "var(--accent)", fontSize: "20px", flexShrink: 0 }}
          >
            {hasGallery ? "⊞" : "↗"}
          </motion.div>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          color: "var(--text-2)",
          fontSize: "14px",
          fontWeight: 300,
          lineHeight: 1.85,
          marginBottom: "24px",
          maxWidth: project.featured ? "680px" : "100%",
        }}
      >
        {project.desc}
      </p>

      {/* Stack tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.stack.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--accent)",
              background: "rgba(79,142,247,0.08)",
              border: "1px solid rgba(79,142,247,0.2)",
              padding: "3px 10px",
              borderRadius: "2px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {hasGallery && galleryOpen && (
        <GalleryModal
          images={project.gallery!}
          title={project.title}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </motion.div>
  );
}
