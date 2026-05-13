"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap } from "@/lib/gsap";

export function LoadingScreen() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    registerGsap();
    const root = ref.current;
    if (!root) return;

    const letters = root.querySelectorAll<HTMLSpanElement>("[data-letter]");
    const line = root.querySelector<HTMLDivElement>("[data-line]");
    const tagline = root.querySelector<HTMLDivElement>("[data-tagline]");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setMounted(false),
    });

    tl.set(letters, { y: "110%", opacity: 0 })
      .set(line, { scaleX: 0, transformOrigin: "left center" })
      .set(tagline, { opacity: 0, y: 10 })
      .to(letters, {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        stagger: 0.05,
      })
      .to(
        line,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.5",
      )
      .to(
        tagline,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.7",
      )
      .to({}, { duration: 0.5 })
      .to(root, {
        yPercent: -100,
        duration: 1.0,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[color:var(--color-bg-deeper)]"
      aria-hidden
    >
      <div className="overflow-hidden">
        <h1 className="font-display flex text-[10vw] font-medium leading-[0.95] tracking-tight text-[color:var(--color-ink)] md:text-[7vw]">
          {"GOLDEN BRASIL".split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span
                data-letter
                className="inline-block will-change-transform"
                style={{ minWidth: char === " " ? "0.3em" : undefined }}
              >
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div
        data-line
        className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-[color:var(--color-gold-700)] via-[color:var(--color-gold-200)] to-[color:var(--color-gold-700)]"
      />

      <div
        data-tagline
        className="mt-5 text-xs uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]"
      >
        Patrimônio em ativos reais
      </div>
    </div>
  );
}
