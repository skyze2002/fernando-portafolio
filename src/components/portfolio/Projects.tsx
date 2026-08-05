import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  User,
  Users,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
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
  /** "sheet" = spec-sheet rail + screen grid. "stacked" = wide band, for sites/APIs. */
  layout: "sheet" | "stacked";
  shots: Shot[];
  liveUrl: string | null;
  repoUrl: string | null;
};

const projects: Project[] = [
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
    layout: "sheet",
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
    layout: "sheet",
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
    layout: "stacked",
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
    layout: "stacked",
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

const LABEL = "text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--violet-strong)]";
const RULE = "border-t border-[rgba(20,20,34,0.09)]";

/** Screenshot that opens the gallery. Lifts 6px on hover. */
function Shot({
  shot,
  project,
  onOpen,
  className = "",
}: {
  shot: Shot;
  project: string;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${project} — ${shot.label}`}
      className={`group relative overflow-hidden border border-[rgba(20,20,34,0.08)] bg-white shadow-[0_18px_40px_-24px_rgba(20,20,50,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_54px_-24px_rgba(35,25,80,0.45)] ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] font-medium text-muted-foreground">
        {shot.label}
      </span>
      <img
        src={shot.src}
        alt={`${project} — ${shot.label}`}
        loading="lazy"
        className="relative h-full w-full object-cover object-top"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-[rgba(20,20,34,0.62)] px-2 py-1.5 text-[10.5px] font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
        {shot.label}
      </span>
    </button>
  );
}

/** Full-width swipeable band, for sites and APIs where shots are wide. */
function ShotBand({ project, onOpen }: { project: Project; onOpen: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 4;
    setEdges((p) => (p.left === left && p.right === right ? p : { left, right }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: "smooth" });
  };

  const f = 32;
  const mask =
    edges.left && edges.right
      ? `linear-gradient(90deg, transparent 0, #000 ${f}px, #000 calc(100% - ${f}px), transparent 100%)`
      : edges.right
        ? `linear-gradient(90deg, #000 calc(100% - ${f}px), transparent 100%)`
        : edges.left
          ? `linear-gradient(90deg, transparent 0, #000 ${f}px)`
          : undefined;

  const arrow =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(20,20,34,0.1)] bg-white/90 text-[var(--violet-strong)] shadow-[0_6px_18px_-6px_rgba(20,20,50,0.45)] backdrop-blur transition hover:scale-105 hover:bg-white";

  return (
    <div className="relative" style={{ background: PANEL_BG }}>
      <div
        ref={ref}
        onScroll={sync}
        className="no-scrollbar flex items-center gap-4 overflow-x-auto p-6 sm:p-8"
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {project.shots.map((s, i) => (
          <Shot
            key={s.label}
            shot={s}
            project={project.name}
            onOpen={() => onOpen(i)}
            className="aspect-[16/10] w-[min(84vw,640px)] shrink-0 rounded-xl"
          />
        ))}
      </div>

      {edges.left && (
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous screenshots"
          className={`${arrow} left-3`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {edges.right && (
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="More screenshots"
          className={`${arrow} right-3`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[rgba(20,20,34,0.5)] px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
        {project.shots.length} screens
      </span>
    </div>
  );
}

function Metrics({ metrics, dense }: { metrics: Metric[]; dense?: boolean }) {
  if (dense) {
    return (
      <dl className="space-y-0">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`flex items-baseline justify-between gap-4 py-2.5 ${i > 0 ? RULE : ""}`}
          >
            <dt className="text-[13px] text-muted-foreground">{m.label}</dt>
            <dd className="font-display text-lg font-bold tabular-nums text-[var(--violet-strong)]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <dl className="grid grid-cols-2 gap-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-[rgba(20,20,34,0.08)] bg-white/70 px-3 py-3"
        >
          <dt className="font-display text-xl font-bold tabular-nums text-[var(--violet-strong)]">
            {m.value}
          </dt>
          <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((t) => (
        <span
          key={t}
          className="rounded-full border border-[rgba(106,90,240,0.22)] bg-[rgba(106,90,240,0.06)] px-2.5 py-1 text-[11px] font-medium text-[var(--violet-strong)] transition-colors hover:bg-[rgba(106,90,240,0.12)]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Ctas({ project, full }: { project: Project; full?: boolean }) {
  if (!project.liveUrl && !project.repoUrl) return null;
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-5 text-sm font-semibold transition-all";
  return (
    <div className={`flex flex-wrap gap-2.5 ${full ? "[&>a]:flex-1 sm:[&>a]:flex-none" : ""}`}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={`${base} bg-[#17151f] text-white shadow-[0_12px_28px_-14px_rgba(20,20,50,0.8)] hover:bg-[#2a2637]`}
        >
          Visit the live site
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className={`${base} border border-[rgba(20,20,34,0.16)] text-foreground hover:border-[rgba(106,90,240,0.45)] hover:text-[var(--violet-strong)]`}
        >
          <Github className="h-4 w-4" />
          Repository
        </a>
      )}
    </div>
  );
}

function Decisions({ decisions, columns }: { decisions: Decision[]; columns?: boolean }) {
  return (
    <div>
      <p className={`${LABEL} mb-4`}>Technical decisions</p>
      <div className={columns ? "grid gap-x-10 gap-y-0 md:grid-cols-2" : ""}>
        {decisions.map((d, i) => (
          <div key={d.title} className={`py-3.5 ${i > 0 && !columns ? RULE : ""} ${columns ? RULE : ""}`}>
            <h4 className="text-[14.5px] font-semibold text-foreground">{d.title}</h4>
            <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChallengeBox({ challenge }: { challenge: NonNullable<Project["challenge"]> }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#f0dedb] bg-[#fdf8f7] p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-[#c0574f]" />
        <h4 className="text-[14.5px] font-semibold text-[#c0574f]">{challenge.title}</h4>
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-[#6b5a57]">{challenge.text}</p>
    </div>
  );
}

function RoleLine({ role }: { role: Project["role"] }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
      {role.lead} <span className="font-semibold text-foreground">{role.mine}</span>
    </p>
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

  const open = (p: Project, index: number) => setZoom({ shots: p.shots, index, name: p.name });

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
            <motion.p variants={fadeUp} className={`mb-3 ${LABEL} tracking-[0.2em]`}>
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
              <motion.article
                key={p.name}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                className="glass overflow-hidden rounded-3xl"
              >
                {p.layout === "sheet" ? (
                  <div className="grid lg:grid-cols-[296px_1fr]">
                    {/* Rail: identity and hard facts */}
                    <aside
                      className="flex flex-col gap-5 p-7 sm:p-8 lg:border-r lg:border-[rgba(20,20,34,0.08)]"
                      style={{ background: PANEL_BG }}
                    >
                      <div>
                        <h3 className="font-display text-2xl font-bold tracking-[0.06em] text-foreground">
                          {p.name}
                        </h3>
                        <p className="mt-1.5 text-sm italic text-muted-foreground">{p.tagline}</p>
                      </div>

                      <div className={`${RULE} pt-4`}>
                        <dl className="space-y-2.5">
                          {p.meta.map((m) => (
                            <div key={m.label} className="flex items-baseline justify-between gap-3">
                              <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                                {m.label}
                              </dt>
                              <dd className="text-right text-[13px] font-medium text-foreground">
                                {m.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>

                      {p.metrics && (
                        <div className={`${RULE} pt-4`}>
                          <Metrics metrics={p.metrics} />
                        </div>
                      )}

                      <div className={`${RULE} pt-4`}>
                        <p className={`${LABEL} mb-2.5`}>Stack</p>
                        <StackTags stack={p.stack} />
                      </div>

                      <Ctas project={p} full />
                    </aside>

                    {/* Story: what it is, what it looks like, what I decided */}
                    <div className="p-7 sm:p-9">
                      <p className={LABEL}>{p.eyebrow}</p>
                      <p className="mt-3 text-[19px] leading-[1.55] text-foreground">{p.summary}</p>
                      <RoleLine role={p.role} />

                      <div className="mt-7">
                        <div className="mb-3 flex items-center justify-between">
                          <p className={LABEL}>Screens</p>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                            {p.team ? (
                              <Users className="h-3.5 w-3.5" />
                            ) : (
                              <User className="h-3.5 w-3.5" />
                            )}
                            {p.shots.length} screens
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {p.shots.map((s, i) => (
                            <Shot
                              key={s.label}
                              shot={s}
                              project={p.name}
                              onOpen={() => open(p, i)}
                              className="aspect-[166/372] w-full rounded-2xl"
                            />
                          ))}
                        </div>
                      </div>

                      <div className={`mt-8 ${RULE} pt-6`}>
                        <Decisions decisions={p.decisions} />
                      </div>

                      {p.challenge && <ChallengeBox challenge={p.challenge} />}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-7 sm:p-9">
                      <p className={LABEL}>{p.eyebrow}</p>
                      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-display text-3xl font-bold tracking-[0.04em] sm:text-4xl">
                          {p.name}
                        </h3>
                        <p className="text-sm italic text-muted-foreground">{p.tagline}</p>
                      </div>

                      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
                        <div>
                          <p className="text-[19px] leading-[1.55] text-foreground">{p.summary}</p>
                          <RoleLine role={p.role} />
                        </div>
                        <div className="lg:border-l lg:border-[rgba(20,20,34,0.08)] lg:pl-8">
                          <dl className="space-y-2.5">
                            {p.meta.map((m) => (
                              <div
                                key={m.label}
                                className="flex items-baseline justify-between gap-3"
                              >
                                <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                                  {m.label}
                                </dt>
                                <dd className="text-[13px] font-medium text-foreground">
                                  {m.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                          {p.metrics && (
                            <div className={`mt-3 ${RULE} pt-1`}>
                              <Metrics metrics={p.metrics} dense />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <ShotBand project={p} onOpen={(i) => open(p, i)} />

                    <div className="p-7 sm:p-9">
                      <Decisions decisions={p.decisions} columns />
                      {p.challenge && <ChallengeBox challenge={p.challenge} />}
                      <div className={`mt-7 ${RULE} flex flex-wrap items-center justify-between gap-4 pt-6`}>
                        <StackTags stack={p.stack} />
                        <Ctas project={p} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.article>
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
