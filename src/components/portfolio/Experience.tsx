import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

const entries = [
  {
    year: "2026",
    title: "AI Product Builder",
    text: "Building AI-powered tools, business systems, and web applications focused on speed, usability, and real business value.",
  },
  {
    year: "2025",
    title: "Full-Stack Developer",
    text: "Developed and shipped modern web applications using React, Next.js, Supabase, Prisma, Tailwind CSS, and cloud tools.",
  },
  {
    year: "2024",
    title: "Automation & Web Solutions",
    text: "Created automation systems, no-code solutions, websites, and digital workflows for business operations.",
  },
];

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--violet-strong)]">
            Journey
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="text-gradient-violet">Experience</span>
          </h2>
        </motion.div>

        <div ref={trackRef} className="relative">
          {/* Track (faint base) */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-[rgba(20,20,34,0.1)] md:left-1/2 md:-translate-x-1/2" />
          {/* Animated fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-2 w-px bg-gradient-to-b from-[#ff5f9e] via-[#7a5cf0] to-[#4ba3ff] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {entries.map((e, i) => (
              <motion.div
                key={e.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid grid-cols-[2rem_1fr] gap-6 md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "md:[&>*:nth-child(2)]:order-first" : ""
                }`}
              >
                {/* Glowing dot */}
                <div className="absolute left-4 top-3 -translate-x-1/2 md:left-1/2">
                  <div className="relative h-4 w-4">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[rgba(106,90,240,0.4)]" />
                    <div className="relative h-4 w-4 rounded-full bg-gradient-to-br from-[#7a5cf0] to-[#ff5f9e] ring-4 ring-[var(--background)] shadow-[0_2px_10px_-2px_rgba(106,90,240,0.6)]" />
                  </div>
                </div>

                <div className="col-start-2 md:col-start-auto">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`glass hover-glow rounded-2xl p-6 ${
                      i % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold text-[var(--violet-strong)]">
                      {e.year}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
                  </motion.div>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
