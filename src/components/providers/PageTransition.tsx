"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic page transition. On every route change:
 *   1. Cream curtain rises from the bottom (~0.6s)
 *   2. Holds for ~0.15s with a centered gold "GB" mark
 *   3. Exits through the top (~0.6s)
 *
 * The route content fades back in midway, synced so it's fully visible by
 * the time the curtain leaves the viewport. Scroll is reset during the hold.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll on route change, fired while the curtain is covering.
  useEffect(() => {
    const t = window.setTimeout(() => {
      // Plain window scroll — Lenis listens to scroll and stays in sync.
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 650);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {/* Content layer — fades back in once the curtain has covered. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          transition={{ duration: 0.4, delay: 0.7, ease }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain layer — runs once per route change (keyed by pathname). */}
      <AnimatePresence>
        <motion.div
          key={pathname + "-curtain"}
          aria-hidden
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%", "-100%"] }}
          transition={{
            duration: 1.4,
            times: [0, 0.45, 0.6, 1],
            ease,
          }}
          className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#f3eee2]"
        >
          {/* Centered gold mark — visible only during the cover/hold */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.94, 0.94, 1, 1, 0.98] }}
            transition={{
              duration: 1.4,
              times: [0, 0.4, 0.5, 0.6, 0.8],
              ease,
            }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-display text-4xl font-medium tracking-tight text-[color:var(--color-gold-800)] md:text-5xl">
              <span className="italic">Golden</span> Brasil
            </span>
            <span className="block h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--color-gold-800)] to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]/70">
              Patrimônio em ativos reais
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
