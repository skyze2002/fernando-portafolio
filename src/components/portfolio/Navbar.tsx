import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(1100px,calc(100%-2rem))] -translate-x-1/2">
      <nav
        className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? "glass-strong py-2.5 shadow-[0_10px_30px_-16px_rgba(20,20,40,0.35)]"
            : "glass py-3"
        }`}
      >
        <a href="#home" className="font-display text-base font-bold tracking-tight">
          <span className="text-foreground">fernando</span>
          <span className="text-gradient-violet">montecinos</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-lg bg-[rgba(106,90,240,0.1)] ring-1 ring-[rgba(106,90,240,0.22)]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-lg bg-[var(--violet)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_-12px_rgba(106,90,240,0.7)] transition-transform hover:scale-105 md:inline-block"
        >
          Hire me
        </a>
        <button
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="glass-strong mt-2 rounded-2xl p-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-[rgba(106,90,240,0.1)] hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
