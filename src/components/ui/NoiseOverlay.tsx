"use client";

/**
 * Fixed SVG fractal noise overlay - gives the page a subtle film grain texture.
 * Rendered at z-index 9998, pointer-events none so it never blocks interaction.
 *
 * Usage: drop once inside a layout, above everything else.
 *   <NoiseOverlay />
 */
export default function NoiseOverlay() {
  return (
    <>
      {/* Noise grain */}
      <div
        aria-hidden='true'
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle grid lines */}
      <div
        aria-hidden='true'
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(79, 142, 247, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 142, 247, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
    </>
  );
}
