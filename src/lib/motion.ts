import type { Variants, Transition } from "framer-motion";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/* Reveal once, cleanly — no re-trigger jitter when scrolling back up. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
export const viewportReplay = { once: true, amount: 0.2 } as const;
