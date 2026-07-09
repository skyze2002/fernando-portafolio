import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send, Github, Linkedin, Twitter, Mail, Instagram,
  Code2, Bot, Palette, Lightbulb, Rocket, Building,
} from "lucide-react";

const services = [
  { icon: Code2, label: "Web & Mobile Development" },
  { icon: Bot, label: "AI Automation" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Lightbulb, label: "Product Consulting" },
  { icon: Rocket, label: "No-code MVPs" },
  { icon: Building, label: "Business Systems" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "X", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@fernandomontecinos.dev" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--violet-strong)]">
            Contact
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Let's <span className="text-gradient-violet">Work Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Let's build something great together.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 3000);
            }}
            className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[var(--violet)] focus:outline-none focus:ring-2 focus:ring-[rgba(106,90,240,0.18)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                required
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[var(--violet)] focus:outline-none focus:ring-2 focus:ring-[rgba(106,90,240,0.18)]"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[var(--violet)] focus:outline-none focus:ring-2 focus:ring-[rgba(106,90,240,0.18)]"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--violet)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(106,90,240,0.7)] hover:shadow-[0_16px_36px_-12px_rgba(106,90,240,0.8)]"
            >
              {sent ? "Message Sent" : "Send Message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.form>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">How I Can Help</h3>
              <p className="mt-1 text-sm text-muted-foreground">Services I offer</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2.5"
                  >
                    <s.icon className="h-4 w-4 shrink-0 text-[var(--violet-strong)]" />
                    <span className="text-sm">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-strong rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold">Connect</h3>
              <p className="mt-1 text-sm text-muted-foreground">Find me online</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="hover-glow inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 text-sm transition-colors hover:text-[var(--violet-strong)]"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
