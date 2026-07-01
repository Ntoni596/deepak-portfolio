import Nav from "@/components/layouts/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div
        style={{
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      />
      <About />
      <div
        style={{
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      />
      <Skills />
      <div
        style={{
          borderTop: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
        }}
      />
      <Projects />
      <Contact />
    </>
  );
}
