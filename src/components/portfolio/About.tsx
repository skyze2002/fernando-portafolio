import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Zap, Rocket } from "lucide-react";
import { fadeLeft, fadeRight, fadeUp, stagger, viewportOnce } from "@/lib/motion";

const stats = [
  { value: "3+", label: "Years Coding" },
  { value: "2", label: "Companies" },
  { value: "1", label: "Full-Stack SaaS" },
  { value: "C1", label: "English Level" },
];

// Counts up from 0 → the leading number when scrolled into view (once).
// Non-numeric values (e.g. "AI") render unchanged.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, isNumeric]);

  return <span ref={ref}>{isNumeric ? `${n}${suffix}` : value}</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeLeft}
            className="min-w-0"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--violet-strong)]">
              About Me
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              I build digital solutions that combine{" "}
              <span className="text-gradient-violet">AI, design, and code.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              I'm a builder focused on turning business ideas into real digital products. I work
              with AI tools, no-code platforms, modern web technologies, and automation systems to
              create practical solutions that save time, improve operations, and help businesses
              grow.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              From no-code MVPs to full web applications, I care about speed, clarity, user
              experience, and shipping products that actually solve problems.
            </p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={stagger(0.08, 0.15)}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass hover-glow rounded-xl p-4"
                >
                  <div className="font-display text-2xl font-bold text-gradient-violet">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeRight}
            className="relative min-w-0"
          >
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 glow-violet">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(122,92,240,0.16)] blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[rgba(255,95,158,0.12)] blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">~/builder.tsx</span>
                </div>

                <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground/80 sm:text-[13px]">
{`const fernando = {
  role: "Full-Stack Developer",
  stack: ["React", "Next", "Supabase"],
  focus: `}<span className="text-[var(--violet-strong)]">"ship products that solve problems"</span>{`,
  shipping: `}<span className="text-[#1a9e6f]">true</span>{`,
};`}
                </pre>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { icon: Cpu, label: "AI Systems" },
                    { icon: Code2, label: "Full-Stack" },
                    { icon: Zap, label: "Automation" },
                    { icon: Rocket, label: "Shipping" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-lg border border-[rgba(20,20,34,0.08)] bg-[var(--secondary)] px-3 py-2"
                    >
                      <Icon className="h-4 w-4 text-[var(--violet-strong)]" />
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
