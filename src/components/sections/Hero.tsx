"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

// ─── PARTICLE BACKGROUND ─────────────────────────────────────────────────────

function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    camera.position.z = 80;

    // Particles
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const velocities: number[] = [];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      velocities.push((Math.random() - 0.5) * 0.015);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0x4f8ef7,
      size: 0.4,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouse);

    // Resize
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation
    let frame: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += velocities[i];
        if (pos[i * 3 + 1] > 100) pos[i * 3 + 1] = -100;
        if (pos[i * 3 + 1] < -100) pos[i * 3 + 1] = 100;
      }
      geo.attributes.position.needsUpdate = true;

      particles.rotation.y = t * 0.018 + mouseX;
      particles.rotation.x = mouseY * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── ANIMATED WORD ────────────────────────────────────────────────────────────

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const letterVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function AnimatedWord({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  return (
    <motion.span
      variants={wordVariants}
      style={{ display: "inline-flex", overflow: "hidden" }}
      className={className}
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── SCROLL INDICATOR ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      style={{
        position: "absolute",
        bottom: "40px",
        left: "var(--page-x)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 2,
      }}
    >
      <div style={{ position: "relative", width: "20px", height: "32px" }}>
        <div
          style={{
            width: "20px",
            height: "32px",
            border: "1px solid var(--border-hover)",
            borderRadius: "10px",
          }}
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "3px",
            height: "6px",
            background: "var(--accent)",
            borderRadius: "2px",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--muted)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

const CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax on scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "var(--nav-h) var(--page-x) 80px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Three.js particles */}
      <ParticleField />

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "20%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          y,
          opacity,
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <motion.div variants={CONTAINER} initial='hidden' animate='visible'>
          {/* Tag */}
          <motion.div
            variants={FADE_UP}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <motion.span
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: "inline-block",
                width: "40px",
                height: "1px",
                background: "var(--accent)",
                transformOrigin: "left",
              }}
            />
            Available for work · Melbourne, AU
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={CONTAINER}
            initial='hidden'
            animate='visible'
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(64px, 11vw, 140px)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              marginBottom: "16px",
            }}
          >
            <div style={{ overflow: "hidden", display: "block" }}>
              <AnimatedWord word='Deepak' />
            </div>
            <div style={{ overflow: "hidden", display: "block" }}>
              <AnimatedWord word='Joshi.' className='outline-text' />
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={FADE_UP}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 2.5vw, 24px)",
              fontWeight: 500,
              color: "var(--text-2)",
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}
          >
            Frontend Developer <span style={{ color: "var(--accent)" }}>&</span>{" "}
            UI/UX Designer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={FADE_UP}
            style={{
              maxWidth: "520px",
              color: "var(--muted)",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.9,
              marginBottom: "52px",
            }}
          >
            I build production interfaces that feel as good as they look. React,
            Next.js, and Shopify/Hydrogen — at the intersection of design craft
            and engineering precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP}
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href='#projects'
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "#fff",
                background: "var(--accent)",
                padding: "14px 28px",
                borderRadius: "3px",
                transition: "opacity 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              view my work →
            </a>

            <a
              href='https://github.com/Ntoni596'
              target='_blank'
              rel='noreferrer'
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                padding: "14px 28px",
                borderRadius: "3px",
                transition: "all 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-hover)";
                el.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
              }}
            >
              GitHub
            </a>

            <a
              href='https://linkedin.com/in/deepakjoshinz'
              target='_blank'
              rel='noreferrer'
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "var(--muted)",
                border: "1px solid var(--border)",
                padding: "14px 28px",
                borderRadius: "3px",
                transition: "all 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-hover)";
                el.style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
              }}
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
