import { motion } from "framer-motion";
import {
  Atom, Layers, Braces, Wind, Smartphone,
  Server, Code, Network, Database, Cylinder, Cloud,
  GitBranch, Brain, Workflow, Palette,
} from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const groups = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Layers },
      { name: "TypeScript", icon: Braces },
      { name: "Tailwind CSS", icon: Wind },
      { name: "React Native (Expo)", icon: Smartphone },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: Server },
      { name: "tRPC", icon: Code },
      { name: "REST APIs", icon: Network },
      { name: "Prisma", icon: Database },
    ],
  },
  {
    title: "Database & Infra",
    items: [
      { name: "PostgreSQL", icon: Cylinder },
      { name: "Supabase", icon: Cloud },
      { name: "Git & GitHub", icon: GitBranch },
    ],
  },
  {
    title: "Also in my toolkit",
    items: [
      { name: "AI Integration", icon: Brain },
      { name: "Automation", icon: Workflow },
      { name: "UI/UX", icon: Palette },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
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
            Tech Stack
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Skills & <span className="text-gradient-violet">Technologies</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The stack I use to design, build, and ship full-stack web applications — end to end.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="glass hover-glow rounded-2xl p-6"
            >
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--violet-strong)]">
                {group.title}
              </h3>
              <ul className="space-y-3.5">
                {group.items.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(106,90,240,0.1)] ring-1 ring-[rgba(106,90,240,0.2)]">
                      <s.icon className="h-[18px] w-[18px] text-[var(--violet-strong)]" />
                    </div>
                    <span className="text-sm font-medium">{s.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
