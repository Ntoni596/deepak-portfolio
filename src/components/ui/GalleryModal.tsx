"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryModalProps {
  images: string[];
  title: string;
  onClose: () => void;
}

export default function GalleryModal({ images, title, onClose }: GalleryModalProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          // Portal content is still a React child of the card, so this click
          // would otherwise bubble to the card's own onClick and reopen it.
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,8,12,0.92)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 6vw, 40px)",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close gallery"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text)",
            width: "40px",
            height: "40px",
            borderRadius: "2px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {title} — {index + 1} / {images.length}
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "min(1000px, calc(100vw - 48px))",
            height: "min(640px, 55vh)",
          }}
        >
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${title} mockup ${index + 1}`}
            fill
            sizes="90vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {images.length > 1 && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "90vw",
            }}
          >
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                aria-label={`View mockup ${i + 1}`}
                style={{
                  position: "relative",
                  width: "72px",
                  height: "48px",
                  padding: 0,
                  overflow: "hidden",
                  border: `1px solid ${i === index ? "var(--accent)" : "var(--border)"}`,
                  opacity: i === index ? 1 : 0.6,
                  cursor: "pointer",
                  background: "var(--surface)",
                }}
              >
                <Image src={src} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
