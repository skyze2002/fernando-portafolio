import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Sparkles, Home, Bot, Workflow, Layout } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const projects = [
  {
    title: "Rental SaaS Platform",
    desc: "Multi-role rental management platform for owners, tenants, and partners with leases, payments, documents, maintenance, notifications, and audit logs.",
    tags: ["Next.js", "tRPC", "Prisma", "Supabase", "Expo"],
    icon: Building2,
    hue: "300",
  },
  {
    title: "CabinFlow",
    desc: "Cabin cleaning operations platform with weekly job boards, worker roles, daily history, client views, integrations, and automation workflows.",
    tags: ["React", "Supabase", "Automation", "UI/UX"],
    icon: Sparkles,
    hue: "320",
  },
  {
    title: "Real Estate Portfolio App",
    desc: "Digital portfolio system for organizing properties, titles, documents, folders, photos, and client-facing property views.",
    tags: ["React", "Real Estate", "Dashboard", "Documents"],
    icon: Home,
    hue: "290",
  },
  {
    title: "AI Lead Generation System",
    desc: "AI-assisted prospecting workflow for finding businesses with weak online presence and generating personalized outreach messages.",
    tags: ["AI", "Automation", "CRM", "Outreach"],
    icon: Bot,
    hue: "310",
  },
  {
    title: "Business Automation System",
    desc: "Custom automations that reduce manual work using connected tools, forms, databases, email workflows, and AI assistants.",
    tags: ["Make", "Zapier", "Airtable", "Notion", "AI"],
    icon: Workflow,
    hue: "280",
  },
  {
    title: "Portfolio Builder",
    desc: "A modern animated portfolio system designed to present projects, skills, experience, and contact information in a premium way.",
    tags: ["React", "Tailwind", "Animations", "UI/UX"],
    icon: Layout,
    hue: "330",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--violet-strong)]">
            Selected Work
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Featured <span className="text-gradient-violet">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A collection of platforms, AI systems, and tools I've built and shipped.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="glass hover-glow group flex flex-col overflow-hidden rounded-2xl"
            >
              {/* Visual thumbnail */}
              <div
                className="relative h-40 overflow-hidden border-b border-[rgba(20,20,34,0.06)]"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 30% 30%, oklch(0.86 0.11 ${p.hue}), transparent 62%), radial-gradient(ellipse at 80% 80%, oklch(0.83 0.1 ${Number(p.hue) + 25}), transparent 62%), linear-gradient(135deg, #f8f7fe, #f2effb)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(20,20,34,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,34,0.05) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-strong flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <p.icon className="h-8 w-8 text-[var(--violet-strong)]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold transition-colors group-hover:text-[var(--violet-strong)]">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[rgba(106,90,240,0.2)] bg-[rgba(106,90,240,0.07)] px-2 py-0.5 text-[11px] font-medium text-[var(--violet-strong)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-foreground transition-colors hover:text-[var(--violet-strong)]">
                  View Details
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
