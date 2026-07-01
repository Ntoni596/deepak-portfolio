import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: 800,
          opacity: 0.1,
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "13px",
          letterSpacing: "0.1em",
        }}
      >
        PAGE NOT FOUND
      </p>
      <Link
        href='/'
        style={{ marginTop: "32px", color: "var(--accent)", fontSize: "13px" }}
      >
        ← back home
      </Link>
    </div>
  );
}
