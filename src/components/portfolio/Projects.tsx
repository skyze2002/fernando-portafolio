import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, User, Users, Github, X } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Shot = { src: string; label: string };
type Project = {
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  badge: string;
  metrics?: { value: string; label: string }[];
  team?: boolean;
  orientation: "mobile" | "desktop";
  shots: Shot[];
  liveUrl: string | null;
  repoUrl: string | null;
};

const projects: Project[] = [
  {
    name: "HUNU",
    category: "Personal finance app · Fizz Software",
    tagline: "Tus cuentas claras.",
    description:
      "A Peruvian personal-finance app: log every movement in soles or dollars, set budgets, and track an annual savings goal. Built for Peru — Yape, Plin and cash as first-class payment methods, with the SUNAT exchange rate built in. Made with a partner in a FastAPI + Postgres monorepo behind a React SPA; my part was 46 commits across front-end, backend and infrastructure.",
    features: [
      "Multi-currency (PEN/USD) driven by the live SUNAT rate — cached, refreshed every five minutes, falls back to the last good rate instead of breaking",
      "Reports built on Recharts: weekly, monthly and annual views, savings projection and spend by category, all theme-aware in light and dark",
      "Log an expense from an iOS Shortcut — a dedicated endpoint with a revocable personal token, no need to open the app",
      "Shipped to production on Linux: Docker, Nginx, Certbot TLS, a separate prod compose file and a written deploy runbook",
      "Fixed averages that divided by months the user never had — a first week of S/ 400 showed as S/ 23.53 and praised the user for being 94% under budget",
    ],
    stack: ["React", "Vite", "Recharts", "React Query", "FastAPI", "PostgreSQL", "Docker", "Nginx"],
    badge: "Team project · Fizz Software",
    team: true,
    metrics: [
      { value: "46", label: "commits" },
      { value: "+11,065", label: "lines" },
      { value: "199", label: "tests" },
      { value: "14", label: "screens" },
    ],
    orientation: "mobile",
    shots: [
      { src: "/projects/hunu/login.jpg", label: "Sign in · receipt identity" },
      { src: "/projects/hunu/dashboard.jpg", label: "Dashboard" },
      { src: "/projects/hunu/annual.jpg", label: "Annual report" },
      { src: "/projects/hunu/budgets.jpg", label: "Budgets" },
      { src: "/projects/hunu/nav.jpg", label: "Radial navigation" },
      { src: "/projects/hunu/dark.jpg", label: "Dark mode" },
    ],
    liveUrl: null,
    repoUrl: null,
  },
  {
    name: "Rentaven",
    category: "Property management SaaS · Mobile-first web app",
    tagline: "Your rent, safe at home.",
    description:
      "A mobile-first platform that lets real-estate investors collect rent and run their whole portfolio from their phone. Rentaven splits the experience into three role-based portals — owner, partner, and tenant — so everyone sees exactly what matters to them.",
    features: [
      "Owner, partner & tenant portals",
      "Portfolio, occupancy & leases at a glance",
      "Maintenance requests & full lease lifecycle",
      "Tenant rent payments, requests & renewals",
      "Bilingual (EN / ES) · light & dark themes",
    ],
    stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "Supabase", "Tailwind CSS"],
    badge: "Solo project · designed & built end to end",
    orientation: "mobile",
    shots: [
      { src: "/projects/rentaven/portal.png", label: "Portal · dark" },
      { src: "/projects/rentaven/portal-light.png", label: "Portal · light" },
      { src: "/projects/rentaven/owner.png", label: "Owner dashboard · dark" },
      { src: "/projects/rentaven/owner-light.png", label: "Owner dashboard · light" },
      { src: "/projects/rentaven/tenant.png", label: "Tenant home · dark" },
      { src: "/projects/rentaven/tenant-light.png", label: "Tenant home · light" },
    ],
    liveUrl: null,
    repoUrl: null,
  },
  {
    name: "Leaderboard API",
    category: "Real-time leaderboard · Full-stack (FastAPI + Redis)",
    tagline: "Rankings that update the instant points land.",
    description:
      "A real-time ranking app where users earn points and the leaderboard updates instantly. Built around a deliberate split: PostgreSQL keeps every point event as immutable truth, while Redis holds the live ranking as a fast, disposable view — wipe Redis and the ranking rebuilds itself from the event log.",
    features: [
      "Instant ranking with Redis sorted sets",
      "Immutable event log in PostgreSQL (source of truth)",
      "Self-healing: ranking rebuilds from events",
      "FastAPI REST API — add points, top-N, rebuild",
      "Consistent writes: Postgres first, then Redis",
    ],
    stack: ["FastAPI", "Python", "Redis", "PostgreSQL", "React", "Vite"],
    badge: "Solo project · designed & built end to end",
    orientation: "desktop",
    shots: [
      { src: "/projects/leaderboard/board.png", label: "Live leaderboard" },
      { src: "/projects/leaderboard/api.png", label: "Redis · live ranking" },
    ],
    liveUrl: null,
    repoUrl: "https://github.com/skyze2002/leaderboard_api",
  },
];

export function Projects() {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <>
      <section id="projects" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.05)}
            className="mb-14 text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--violet-strong)]"
            >
              Selected work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
            >
              Featured <span className="text-gradient-violet">Projects</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Real products I've designed and built, end to end.
            </motion.p>
          </motion.div>

          <div className="space-y-10">
            {projects.map((p, i) => {
              const isMobile = p.orientation === "mobile";
              const reverse = i % 2 === 1;
              return (
                <motion.article
                  key={p.name}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={fadeUp}
                  className="glass overflow-hidden rounded-3xl"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Screens */}
                    <div
                      className={`relative flex gap-4 overflow-x-auto p-6 sm:p-8 ${
                        isMobile ? "items-end" : "items-center"
                      } ${reverse ? "lg:order-2" : ""}`}
                      style={{
                        background:
                          "radial-gradient(ellipse at 20% 0%, rgba(122,92,240,0.14), transparent 60%), radial-gradient(ellipse at 90% 100%, rgba(255,95,158,0.12), transparent 60%), linear-gradient(135deg, #f6f4fe, #f1eefb)",
                      }}
                    >
                      {p.shots.map((s) => (
                        <button
                          type="button"
                          key={s.label}
                          onClick={() => setZoom({ src: s.src, alt: `${p.name} — ${s.label}` })}
                          aria-label={`View ${p.name} — ${s.label}`}
                          className={`group relative shrink-0 cursor-zoom-in overflow-hidden border border-[rgba(20,20,34,0.08)] bg-white shadow-[0_24px_50px_-26px_rgba(20,20,50,0.5)] transition-transform hover:-translate-y-1 ${
                            isMobile
                              ? "h-[372px] w-[166px] rounded-[1.6rem]"
                              : "h-[212px] w-[340px] rounded-xl"
                          }`}
                        >
                          <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] font-medium text-muted-foreground">
                            {s.label}
                          </span>
                          <img
                            src={s.src}
                            alt={`${p.name} — ${s.label}`}
                            loading="lazy"
                            className="relative h-full w-full object-cover object-top"
                            onError={(e) => {
                              e.currentTarget.style.visibility = "hidden";
                            }}
                          />
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[rgba(20,20,34,0.28)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--violet-strong)]">
                              Click to zoom
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Details */}
                    <div className={`flex flex-col p-8 sm:p-10 ${reverse ? "lg:order-1" : ""}`}>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--violet-strong)]">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{p.name}</h3>
                      <p className="mt-1 text-sm italic text-muted-foreground">{p.tagline}</p>
                      <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(106,90,240,0.2)] bg-[rgba(106,90,240,0.07)] px-3 py-1 text-xs font-medium text-[var(--violet-strong)]">
                        {p.team ? <Users className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                        {p.badge}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>

                      {p.metrics && (
                        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(20,20,34,0.08)] bg-[rgba(20,20,34,0.08)] sm:grid-cols-4">
                          {p.metrics.map((m) => (
                            <div key={m.label} className="bg-[var(--background)] px-3 py-3 text-center">
                              <dt className="font-display text-lg font-bold tabular-nums text-[var(--violet-strong)]">
                                {m.value}
                              </dt>
                              <dd className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">
                                {m.label}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <ul className="mt-6 space-y-2.5">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(106,90,240,0.12)]">
                              <Check className="h-3 w-3 text-[var(--violet-strong)]" />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-[rgba(106,90,240,0.2)] bg-[rgba(106,90,240,0.07)] px-2 py-0.5 text-[11px] font-medium text-[var(--violet-strong)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {(p.liveUrl || p.repoUrl) && (
                        <div className="mt-7 flex flex-wrap gap-2.5">
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--violet)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(106,90,240,0.7)] transition-transform hover:scale-[1.02]"
                            >
                              Live demo
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          )}
                          {p.repoUrl && (
                            <a
                              href={p.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[rgba(20,20,34,0.14)] px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-[rgba(106,90,240,0.45)] hover:text-[var(--violet-strong)]"
                            >
                              <Github className="h-4 w-4" />
                              View code
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={zoom.alt}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setZoom(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              src={zoom.src}
              alt={zoom.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
