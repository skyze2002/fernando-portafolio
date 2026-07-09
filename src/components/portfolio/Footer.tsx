export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] py-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <a href="#home" className="font-display text-lg font-bold">
          <span className="text-foreground">fernando</span>
          <span className="text-gradient-violet">montecinos</span>
        </a>
        <p className="mt-4 text-sm text-muted-foreground">
          © 2026 Fernando Montecinos. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Built with passion. Deployed with care.
        </p>
      </div>
    </footer>
  );
}
