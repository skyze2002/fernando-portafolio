import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send, Github, Linkedin, Mail,
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
  { icon: Github, label: "GitHub", href: "https://github.com/skyze2002" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fernando-montecinos-954b2125b",
  },
  { icon: Mail, label: "Email", href: "mailto:fernndomontecinos@gmail.com" },
];

// Paste your Formspree form ID here (create a free form at https://formspree.io →
// e.g. "xdkzabcd") to enable silent submissions. While empty, the form falls back
// to opening the visitor's email app pre-filled to your inbox.
const FORMSPREE_ID: string = "";
const CONTACT_EMAIL = "fernndomontecinos@gmail.com";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Fallback: no Formspree configured → open the visitor's email client.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        window.setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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
            onSubmit={handleSubmit}
            className="glass-strong space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
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
                name="email"
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
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[var(--violet)] focus:outline-none focus:ring-2 focus:ring-[rgba(106,90,240,0.18)]"
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status === "sending" ? undefined : { scale: 1.02 }}
              whileTap={status === "sending" ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--violet)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(106,90,240,0.7)] hover:shadow-[0_16px_36px_-12px_rgba(106,90,240,0.8)] disabled:opacity-70"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Message Sent"
                  : status === "error"
                    ? "Try Again"
                    : "Send Message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            {status === "sent" && (
              <p className="text-center text-sm font-medium text-[#1a9e6f]">
                {FORMSPREE_ID
                  ? "Thanks! I'll get back to you soon."
                  : "Opening your email app — just hit send to reach me."}
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-medium text-[#d64545]">
                Something went wrong. Email me directly at {CONTACT_EMAIL}.
              </p>
            )}
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
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
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
