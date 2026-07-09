import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fernando Montecinos — AI Builder & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Fernando Montecinos builds AI-powered applications, modern web apps, and automation systems that help businesses grow and operate smarter.",
      },
      { property: "og:title", content: "Fernando Montecinos — AI Builder & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "AI-powered applications, modern web apps, automation systems, and digital products.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
