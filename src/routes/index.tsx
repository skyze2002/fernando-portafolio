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
      { title: "Fernando Montecinos — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Full-Stack Developer building web applications end to end — from the interface to the database. React, Next.js, TypeScript, tRPC, Prisma and Supabase.",
      },
      { property: "og:title", content: "Fernando Montecinos — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Full-Stack Developer building web applications end to end — React, Next.js, TypeScript, tRPC, Prisma and Supabase.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.fernandomontecinos.com/og-image.png" },
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
