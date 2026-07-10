import { motion } from "framer-motion";
import { Check, ArrowUpRight, User } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

// TODO: set the live URL once Rentaven is deployed (or leave null if private).
const projects = [
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
    shots: [
      { src: "/projects/rentaven/portal.png", label: "Portal · dark" },
      { src: "/projects/rentaven/portal-light.png", label: "Portal · light" },
      { src: "/projects/rentaven/owner.png", label: "Owner dashboard · dark" },
      { src: "/projects/rentaven/owner-light.png", label: "Owner dashboard · light" },
      { src: "/projects/rentaven/tenant.png", label: "Tenant home · dark" },
      { src: "/projects/rentaven/tenant-light.png", label: "Tenant home · light" },
    ],
    liveUrl: null as string | null,
  },
];

export function Projects() {
  return (
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
                  className="relative flex items-end gap-4 overflow-x-auto p-6 sm:p-8"
                  style={{
                    background:
                      "radial-gradient(ellipse at 20% 0%, rgba(122,92,240,0.14), transparent 60%), radial-gradient(ellipse at 90% 100%, rgba(255,95,158,0.12), transparent 60%), linear-gradient(135deg, #f6f4fe, #f1eefb)",
                  }}
                >
                  {p.shots.map((s) => (
                    <div
                      key={s.label}
                      className="relative h-[360px] w-[172px] shrink-0 overflow-hidden rounded-[1.6rem] border border-[rgba(20,20,34,0.08)] bg-white shadow-[0_24px_50px_-26px_rgba(20,20,50,0.5)]"
                    >
                      <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-[11px] font-medium text-muted-foreground">
                        {s.label}
                      </span>
                      <img
                        src={s.src}
                        alt={`Rentaven — ${s.label}`}
                        loading="lazy"
                        className="relative h-full w-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="flex flex-col p-8 sm:p-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--violet-strong)]">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{p.name}</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">{p.tagline}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[rgba(106,90,240,0.2)] bg-[rgba(106,90,240,0.07)] px-3 py-1 text-xs font-medium text-[var(--violet-strong)]">
                    <User className="h-3.5 w-3.5" />
                    Solo project · designed &amp; built end to end
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

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

                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-1.5 self-start rounded-xl bg-[var(--violet)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(106,90,240,0.7)] transition-transform hover:scale-[1.02]"
                    >
                      Visit Rentaven
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
