import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Shot = { src: string; label: string };
type Decision = { title: string; text: string };
type Metric = { value: string; label: string };
type Meta = { label: string; value: string };

type Project = {
  name: string;
  /** "category · company · year" */
  eyebrow: string;
  tagline: string;
  /** What it is, in plain words. Max ~45 words. */
  summary: string;
  /** The lead-in, then what I personally shipped (rendered bold). */
  role: { lead: string; mine: string };
  meta: Meta[];
  metrics?: Metric[];
  decisions: Decision[];
  /** The hard bug or call. Dropped entirely when there isn't one. */
  challenge?: { title: string; text: string };
  stack: string[];
  team: boolean;
  shots: Shot[];
  liveUrl: string | null;
  repoUrl: string | null;
};

const projects: Project[] = [
  {
    name: "brrrr.",
    eyebrow: "Real-estate investing app · Personal project · 2026",
    tagline: "Whether a house is worth buying, in seconds.",
    summary:
      "A native iOS and Android app for investors who buy, fix and refinance houses. It works out how much of their money stays trapped in a deal, estimates the after-repair value from real Zillow comparables, tracks the rehab spend and finds materials with live prices.",
    role: {
      lead: "Built alone, end to end.",
      mine: "Flutter app, Python API, the AI and property integrations, the security model, and both signed release builds.",
    },
    meta: [
      { label: "Team", value: "Solo" },
      { label: "Platforms", value: "iOS · Android" },
      { label: "Status", value: "Store-ready builds" },
    ],
    metrics: [
      { value: "258", label: "automated tests" },
      { value: "37", label: "security & privacy tests" },
      { value: "8,400", label: "lines of Dart + Python" },
      { value: "7", label: "feature modules" },
    ],
    decisions: [
      {
        title: "Seven modules, four layers",
        text: "Each feature splits into domain, data, application and presentation and is wired through providers, so every layer can be tested on its own instead of through the UI.",
      },
      {
        title: "Money is never a floating-point number",
        text: "Every amount runs through Decimal and whole cents. The one approximation left — the amortisation factor — is documented as an approximation rather than hidden.",
      },
      {
        title: "Everything from outside is treated as hostile",
        text: "Server and model responses are validated field by field, images are checked by their bytes rather than their extension, and a comparable can only open zillow.com: the allow-list rejects javascript:, raw IPs, internal hosts and lookalikes like zillow.com.evil.com.",
      },
      {
        title: "No accounts, no tracking, nothing stored",
        text: "Only the minimum leaves the phone, the backend keeps none of it, the fonts ship inside the app so opening it calls nobody, and tests assert exactly which fields are sent.",
      },
      {
        title: "Quality is enforced, not hoped for",
        text: "The suite runs against mocked APIs so it costs no credits, every screen is exercised at 200% text on a narrow phone, and the build fails outright if someone signs with the debug key, allows cleartext traffic or commits a secret.",
      },
    ],
    challenge: {
      title: "A generic 502 was hiding the real answer",
      text: "Production began failing with an opaque 502. The provider had actually run out of credits and was replying 402, but that got flattened on the way out. I mapped the case explicitly and added logs that record the status code and never the key — so next time the error says what it is.",
    },
    stack: ["Flutter", "Dart", "Riverpod", "Hive", "Python", "FastAPI", "Pydantic", "OpenAI"],
    team: false,
    shots: [
      { src: "/projects/brrrr/verdict.jpg", label: "The verdict · money trapped" },
      { src: "/projects/brrrr/levers.jpg", label: "When it doesn't close · levers" },
      { src: "/projects/brrrr/autofill.jpg", label: "Autofill a listing · AI" },
      { src: "/projects/brrrr/comparables.jpg", label: "Zillow comparables" },
      { src: "/projects/brrrr/mortgage.jpg", label: "Mortgage simulator" },
      { src: "/projects/brrrr/expenses.jpg", label: "Rehab spend per house" },
      { src: "/projects/brrrr/products.jpg", label: "Materials with live prices" },
      { src: "/projects/brrrr/a11y.jpg", label: "Every screen at 200% text" },
    ],
    liveUrl: null,
    repoUrl: null,
  },
  {
    name: "Rentaven",
    eyebrow: "Property management SaaS · Fizz Software · 2026",
    tagline: "Your rent, safe at home.",
    summary:
      "A platform where property owners, their partners and their tenants run the whole rental lifecycle — leases, payments, maintenance and documents — from one invite-only account, on the web and on native iOS and Android.",
    role: {
      lead: "Built alone, end to end.",
      mine: "Database schema, API, web app, mobile app, design system, e-signature engine and deployment.",
    },
    meta: [
      { label: "Team", value: "Solo" },
      { label: "Platforms", value: "Web · iOS · Android" },
      { label: "Status", value: "Live at rentaven.app" },
    ],
    metrics: [
      { value: "70K+", label: "lines of TypeScript" },
      { value: "260+", label: "typesafe endpoints" },
      { value: "27", label: "domain modules" },
      { value: "186", label: "screens, web + mobile" },
    ],
    decisions: [
      {
        title: "One type-safe domain, two platforms",
        text: "A single tRPC + Zod API feeds both the Next.js web app and the React Native app, so business rules and permissions can't drift between them.",
      },
      {
        title: "An e-signature engine instead of a subscription",
        text: "A two-party ESIGN/UETA flow built on pdf-lib produces the executed lease with a tamper-evident SHA-256 audit certificate — no DocuSign in the loop.",
      },
      {
        title: "Multi-tenant from the schema up",
        text: "Owner, partner, tenant and admin roles with per-entity data isolation, a granular permission catalog, and an immutable audit log behind every sensitive action.",
      },
      {
        title: "Real services, not mockups",
        text: "Transactional email, private document storage with signed URLs, and device push notifications are all wired end to end.",
      },
      {
        title: "Shipped store-ready",
        text: "Biometric app-lock, patched CVEs, security headers, EAS production builds, and in-app account deletion for App Store compliance.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Zod",
      "Prisma",
      "PostgreSQL",
      "React Native (Expo)",
      "Supabase",
    ],
    team: false,
    shots: [
      { src: "/projects/rentaven/portal.png", label: "Portal · dark" },
      { src: "/projects/rentaven/portal-light.png", label: "Portal · light" },
      { src: "/projects/rentaven/owner.png", label: "Owner dashboard · dark" },
      { src: "/projects/rentaven/owner-light.png", label: "Owner dashboard · light" },
      { src: "/projects/rentaven/tenant.png", label: "Tenant home · dark" },
      { src: "/projects/rentaven/tenant-light.png", label: "Tenant home · light" },
    ],
    liveUrl: "https://rentaven.app",
    repoUrl: null,
  },
  {
    name: "HUNU",
    eyebrow: "Personal finance app · Fizz Software · 2026",
    tagline: "Tus cuentas claras.",
    summary:
      "A personal-finance app made for Peru: log every movement in soles or dollars, set budgets and follow a yearly savings goal. Yape, Plin and cash are first-class, and the SUNAT exchange rate is built in.",
    role: {
      lead: "Built with a partner.",
      mine: "46 commits of mine across front-end, backend and infrastructure in four weeks.",
    },
    meta: [
      { label: "Team", value: "Two developers" },
      { label: "Timeline", value: "4 weeks" },
      { label: "Status", value: "Private beta" },
    ],
    metrics: [
      { value: "46", label: "commits of mine" },
      { value: "+11,065", label: "lines written" },
      { value: "199", label: "automated tests" },
      { value: "14", label: "screens covered" },
    ],
    decisions: [
      {
        title: "The exchange rate sets itself",
        text: "Rates come from SUNAT, cached and refreshed every five minutes, and fall back to the last good value instead of breaking or returning zero.",
      },
      {
        title: "The front-end never waited on the backend",
        text: "We agreed the schemas first and built the UI against the contract FastAPI publishes, with per-endpoint mocks behind a flag that we switched off as real endpoints landed.",
      },
      {
        title: "From a laptop to a server",
        text: "The backend was containerised and deployed on Linux with Nginx, Certbot certificates, a separate production compose file and a written runbook.",
      },
      {
        title: "Logging an expense takes seconds",
        text: "A dedicated endpoint with a revocable personal token lets an iOS Shortcut record a movement without opening the app.",
      },
      {
        title: "Dark mode that reaches the charts",
        text: "Recharts kept its light colours and vanished in dark, so the charts were tied to the theme tokens like the rest of the interface.",
      },
    ],
    challenge: {
      title: "The average that lied",
      text: "The backend padded the requested window with zero months, so someone who spent S/ 400 in their first week saw a weekly average of S/ 23.53 — and the app congratulated them for being 94% under budget. The series now starts at the first real movement, mid-period zeros still count, and the card states how many periods it averaged.",
    },
    stack: ["React", "Vite", "Recharts", "React Query", "FastAPI", "PostgreSQL", "Docker", "Nginx"],
    team: true,
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
    name: "HUNU Landing",
    eyebrow: "Marketing site · Fizz Software · 2026",
    tagline: "The site that explains the app before you install it.",
    summary:
      "HUNU's public site: nine sections that say what the app does, who it is for and why you can trust it with your data, ending in a waitlist sign-up.",
    role: {
      lead: "Built alone.",
      mine: "Design, copy, layout, animation and the generator that assembles the pages.",
    },
    meta: [
      { label: "Team", value: "Solo" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Status", value: "Ready to publish" },
    ],
    metrics: [
      { value: "4", label: "requests on the homepage" },
      { value: "172 KB", label: "total page weight" },
      { value: "0", label: "external dependencies" },
      { value: "56", label: "commits" },
    ],
    decisions: [
      {
        title: "No framework, on purpose",
        text: "Plain HTML, CSS and JavaScript with no package manager and no third-party host — a page that promises privacy can't load trackers.",
      },
      {
        title: "Nine pages from one file",
        text: "A small Python builder splits a single source file into nine real pages, each with its own header, navigation and URL, so any section can be linked and shared.",
      },
      {
        title: "The theme buttons are real",
        text: "Pressing one repaints the whole page using the app's own eight palettes in light and dark, built on CSS variables and color-mix instead of hand-written colours.",
      },
      {
        title: "Contrast measured, not assumed",
        text: "Every text and background pair was computed across the eight palettes in both modes and corrected until none fell below 4.5.",
      },
      {
        title: "Animations that can't get stuck",
        text: "CSS and IntersectionObserver drive the reveals, each with a timer fallback, because the worst outcome is a section that stays invisible forever.",
      },
    ],
    challenge: {
      title: "Half the work was removing",
      text: "Three cards attacking the competition, a whole «the problem» section, a comparison table, a receipt that repeated the copy, and a 282 KB illustration all came out. The site ended with fewer sections and more clarity.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Python", "IntersectionObserver"],
    team: false,
    shots: [
      { src: "/projects/hunu-landing/hero.jpg", label: "Hero · the receipt prints" },
      { src: "/projects/hunu-landing/chat.jpg", label: "The objection, as a chat" },
      { src: "/projects/hunu-landing/themes.jpg", label: "8 palettes, live" },
      { src: "/projects/hunu-landing/privacy.jpg", label: "Privacy as a receipt" },
      { src: "/projects/hunu-landing/features.jpg", label: "Features" },
      { src: "/projects/hunu-landing/dark.jpg", label: "Dark mode" },
    ],
    liveUrl: null,
    repoUrl: null,
  },
  {
    name: "Leaderboard API",
    eyebrow: "Real-time leaderboard · Personal project · 2026",
    tagline: "Rankings that update the instant points land.",
    summary:
      "A ranking app where users earn points and the board reorders immediately. Built to practise the split between the data you must keep and the data you can always recompute.",
    role: {
      lead: "Built alone.",
      mine: "Backend, Redis modelling, database and front-end.",
    },
    meta: [
      { label: "Team", value: "Solo" },
      { label: "Type", value: "Learning project" },
      { label: "Status", value: "Open source" },
    ],
    decisions: [
      {
        title: "Source of truth versus derived view",
        text: "PostgreSQL stores every point event as an immutable fact; Redis holds the ranking, which is only a calculation over those events.",
      },
      {
        title: "The ranking can always be rebuilt",
        text: "Wipe Redis and an endpoint recomputes the whole board from the event log, which is what makes the cache safe to lose.",
      },
      {
        title: "Write order is part of the design",
        text: "Postgres first, Redis second. If the write fails, the cache is never touched and both stores stay consistent.",
      },
      {
        title: "Sorted sets do the ranking",
        text: "Redis keeps players ordered by score, so reading the top N is a single command instead of sorting in application code.",
      },
    ],
    stack: ["FastAPI", "Python", "Redis", "PostgreSQL", "React", "Vite"],
    team: false,
    shots: [
      { src: "/projects/leaderboard/board.png", label: "Live leaderboard" },
      { src: "/projects/leaderboard/api.png", label: "Redis · live ranking" },
    ],
    liveUrl: null,
    repoUrl: "https://github.com/skyze2002/leaderboard_api",
  },
];

const PANEL_BG =
  "radial-gradient(ellipse at 20% 0%, rgba(122,92,240,0.14), transparent 60%), radial-gradient(ellipse at 90% 100%, rgba(255,95,158,0.12), transparent 60%), linear-gradient(135deg, #f6f4fe, #f1eefb)";

const EYEBROW =
  "text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--violet-strong)]";
const HAIRLINE = "border-[rgba(20,20,34,0.09)]";

function ChallengeBox({ challenge }: { challenge: NonNullable<Project["challenge"]> }) {
  return (
    <div className="mt-7 rounded-2xl border border-[#f0dedb] bg-[#fdf8f7] p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0 text-[#c0574f]" />
        <h4 className="font-display text-[15px] font-bold text-[#c0574f]">{challenge.title}</h4>
      </div>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-[#6b5a57]">{challenge.text}</p>
    </div>
  );
}

function ProjectCard({
  project: p,
  onOpenShot,
}: {
  project: Project;
  onOpenShot: (index: number) => void;
}) {
  const [showDecisions, setShowDecisions] = useState(false);

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="glass flex flex-col overflow-hidden rounded-3xl"
    >
      {/* Header — what it is, and the hard facts beside it */}
      <div className="grid gap-8 p-9 lg:grid-cols-[minmax(0,1fr)_268px] lg:gap-12">
        <div className="flex flex-col">
          <p className={EYEBROW}>{p.eyebrow}</p>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
            <h3 className="font-display text-[34px] font-bold leading-tight tracking-tight">
              {p.name}
            </h3>
            <p className="text-[15px] italic text-muted-foreground">{p.tagline}</p>
          </div>

          <p className="mt-4 max-w-[62ch] text-pretty text-[17px] leading-[1.6] text-foreground">
            {p.summary}
          </p>

          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.6] text-muted-foreground">
            {p.role.lead} <span className="font-semibold text-foreground">{p.role.mine}</span>
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[rgba(106,90,240,0.22)] bg-[rgba(106,90,240,0.06)] px-2.5 py-1 text-[11px] font-medium text-[var(--violet-strong)] transition-colors hover:bg-[rgba(106,90,240,0.12)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <aside
          className={`flex flex-col border-t pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0 ${HAIRLINE}`}
        >
          <dl className="space-y-2.5">
            {p.meta.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="text-right text-[12.5px] font-medium text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>

          {p.metrics && (
            <div className={`mt-5 grid grid-cols-2 gap-4 border-t pt-5 ${HAIRLINE}`}>
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-[20px] font-bold tabular-nums text-[var(--violet-strong)]">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {(p.liveUrl || p.repoUrl) && (
            <div className="mt-6 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-6">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#17151f] px-4 text-[13px] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(20,20,50,0.8)] transition-colors hover:bg-[#2a2637]"
                >
                  Visit the live site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[rgba(20,20,34,0.16)] px-4 text-[13px] font-semibold text-foreground transition-colors hover:border-[rgba(106,90,240,0.45)] hover:text-[var(--violet-strong)]"
                >
                  <Github className="h-4 w-4" />
                  Repository
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Band — screenshots at their real proportions */}
      {/* On phones the screenshots lead; on wide screens they follow the pitch. */}
      <div
        className={`relative order-first border-y lg:order-none ${HAIRLINE}`}
        style={{ background: PANEL_BG }}
      >
        <div className="no-scrollbar flex items-end gap-[18px] overflow-x-auto px-10 pb-[34px] pt-[30px]">
          {p.shots.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => onOpenShot(i)}
              aria-label={`View ${p.name} — ${s.label}`}
              className="group flex h-[340px] shrink-0 cursor-zoom-in flex-col items-center justify-end gap-2.5 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <img
                src={s.src}
                alt={`${p.name} — ${s.label}`}
                loading="lazy"
                style={{ height: 296, width: "auto" }}
                className="rounded-xl border border-[rgba(20,20,34,0.08)] bg-white shadow-[0_20px_44px_-26px_rgba(20,20,50,0.55)]"
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
              <span className="whitespace-nowrap text-[11px] text-muted-foreground">{s.label}</span>
            </button>
          ))}
        </div>

        <span className="pointer-events-none absolute right-5 top-4 rounded-full bg-[rgba(20,20,34,0.5)] px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          {p.shots.length} screens
        </span>
      </div>

      {/* Footer — the depth, folded away until asked for */}
      <div className="px-10 pb-[34px] pt-[26px]">
        <button
          type="button"
          onClick={() => setShowDecisions((v) => !v)}
          aria-expanded={showDecisions}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(20,20,34,0.12)] px-4 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--violet-strong)] transition-colors hover:border-[rgba(106,90,240,0.4)] hover:bg-[rgba(106,90,240,0.05)]"
        >
          {showDecisions
            ? "Hide technical decisions"
            : `Technical decisions · ${p.decisions.length}`}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${
              showDecisions ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {showDecisions && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mt-6 grid gap-x-11 md:grid-cols-2">
                {p.decisions.map((d) => (
                  <div key={d.title} className={`border-t py-4 ${HAIRLINE}`}>
                    <h4 className="font-display text-[15px] font-bold text-foreground">
                      {d.title}
                    </h4>
                    <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                      {d.text}
                    </p>
                  </div>
                ))}
              </div>

              {p.challenge && <ChallengeBox challenge={p.challenge} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [zoom, setZoom] = useState<{ shots: Shot[]; index: number; name: string } | null>(null);

  const step = useCallback((dir: 1 | -1) => {
    setZoom((z) => (z ? { ...z, index: (z.index + dir + z.shots.length) % z.shots.length } : z));
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, step]);

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
            {projects.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                onOpenShot={(index) => setZoom({ shots: p.shots, index, name: p.name })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
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
            aria-label={`${zoom.name} — ${zoom.shots[zoom.index].label}`}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setZoom(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {zoom.shots.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-8"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-8"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.img
              key={zoom.shots[zoom.index].src}
              src={zoom.shots[zoom.index].src}
              alt={`${zoom.name} — ${zoom.shots[zoom.index].label}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[84vh] max-w-[86vw] rounded-2xl shadow-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-center text-sm text-white backdrop-blur">
              {zoom.shots[zoom.index].label}
              {zoom.shots.length > 1 && (
                <span className="ml-2 tabular-nums text-white/60">
                  {zoom.index + 1} / {zoom.shots.length}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
