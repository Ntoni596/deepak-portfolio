"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const NAV_LINKS = [
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

function MagneticLogo() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href='#'
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='relative flex items-center justify-center w-10 h-10 border border-white/10 rounded-sm group'
      aria-label='Deepak Joshi home'
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "15px",
          letterSpacing: "-0.04em",
          color: "var(--text)",
          transition: "color 0.2s",
        }}
        className='group-hover:text-[var(--accent)]'
      >
        DJ
      </span>
      {/* accent dot */}
      <span
        style={{
          position: "absolute",
          bottom: "6px",
          right: "6px",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
    </motion.a>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  const bar = {
    width: "20px",
    height: "1.5px",
    background: "var(--text)",
    display: "block",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <motion.span
        style={bar}
        animate={{
          rotate: open ? 45 : 0,
          y: open ? 6.5 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        style={bar}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        style={bar}
        animate={{
          rotate: open ? -45 : 0,
          y: open ? -6.5 : 0,
        }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu automatically if the viewport grows past the
  // mobile breakpoint (e.g. rotating a tablet or resizing a browser).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        key='nav'
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -80 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 var(--page-x)",
          height: "var(--nav-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: atTop && !menuOpen ? "transparent" : "rgba(8, 8, 16, 0.85)",
          backdropFilter: atTop && !menuOpen ? "none" : "blur(20px)",
          borderBottom:
            atTop && !menuOpen
              ? "1px solid transparent"
              : "1px solid var(--border)",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <MagneticLogo />

        {/* Desktop links */}
        <ul
          className='hidden md:flex'
          style={{
            gap: "36px",
            listStyle: "none",
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            >
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--muted)",
                  letterSpacing: "0.08em",
                  position: "relative",
                  padding: "4px 0",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                }}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href='mailto:joshi.rai.deepak@gmail.com'
          className='hidden md:inline-block'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "var(--accent)",
            border: "1px solid rgba(79,142,247,0.3)",
            padding: "8px 18px",
            borderRadius: "3px",
            transition: "all 0.2s",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--accent)";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "var(--accent)";
          }}
        >
          hire me →
        </motion.a>

        {/* Mobile menu toggle */}
        <button
          className='flex md:hidden'
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </motion.nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <motion.div
          key='mobile-menu'
          className='md:hidden'
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "rgba(8, 8, 16, 0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            padding: "8px var(--page-x) 40px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                color: "var(--text)",
                letterSpacing: "0.04em",
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href='mailto:joshi.rai.deepak@gmail.com'
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-block",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "0.06em",
              color: "#fff",
              background: "var(--accent)",
              padding: "14px 28px",
              borderRadius: "3px",
              marginTop: "20px",
            }}
          >
            hire me →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
