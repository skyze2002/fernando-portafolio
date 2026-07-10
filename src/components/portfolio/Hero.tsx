import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileDown } from "lucide-react";

const GITHUB_URL = "https://github.com/skyze2002";
const LINKEDIN_URL = "https://www.linkedin.com/in/fernando-montecinos-954b2125b";
// TODO: add the CV PDF to /public and set its path here (e.g. "/Fernando-Montecinos-CV.pdf").
const CV_URL = "";

const socialLinks = [
  { href: GITHUB_URL, icon: Github, label: "GitHub" },
  { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
  { href: CV_URL, icon: FileDown, label: "Download CV" },
].filter((l) => l.href);

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background: one iridescent Aurora orb + a faint static grid. */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="animate-aurora-orb pointer-events-none absolute -top-40 right-[-8%] h-[520px] w-[520px] rounded-full opacity-70 blur-[42px]"
        style={{
          background:
            "radial-gradient(circle at 32% 30%, rgba(255,95,158,0.38), transparent 60%), radial-gradient(circle at 70% 58%, rgba(122,92,240,0.42), transparent 62%), radial-gradient(circle at 50% 92%, rgba(75,163,255,0.32), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c759] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34c759]" />
          </span>
          Open to Full-Stack Developer roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Fernando <span className="text-aurora-animated">Montecinos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-xl font-medium text-foreground sm:text-2xl"
        >
          Full-Stack Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I design and build web applications end to end — from the interface down to the database.
          I care about clean, maintainable code, thoughtful user experience, and shipping products
          that actually solve the problem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-[var(--violet)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-12px_oklch(0.68_0.24_300/0.7)] transition-transform hover:scale-[1.02]"
          >
            View my work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="flex items-center gap-2">
            {socialLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                aria-label={l.label}
                className="glass hover-glow inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-foreground"
              >
                <l.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{l.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
