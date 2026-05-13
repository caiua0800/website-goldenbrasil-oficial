"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Manifesto() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      const accent = el.querySelectorAll<HTMLElement>("[data-accent]");
      const meta = el.querySelectorAll<HTMLElement>("[data-meta]");

      gsap.set(lines, { yPercent: 110 });
      gsap.set(accent, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(meta, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(lines, { yPercent: 0, duration: 1.2, stagger: 0.08 })
            .to(accent, { scaleX: 1, duration: 1.0, ease: "power3.inOut" }, "-=0.6")
            .to(meta, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.5");
        },
      });

      // Subtle parallax on the entire block
      gsap.to(el.querySelector("[data-content]"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const lines = [
    { text: "Ouro não promete." },
    { text: "Diamantes não falham." },
    { text: "Minério não mente." },
  ];

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-bg)] py-[18vh]"
    >
      <div
        data-content
        className="mx-auto max-w-[1400px] px-6 md:px-10"
      >
        <div
          data-meta
          className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]"
        >
          <span>01</span>
          <span
            data-accent
            className="block h-px w-16 bg-[color:var(--color-gold-800)]"
          />
          <span>Manifesto</span>
        </div>

        <h2 className="font-display text-[12vw] font-medium leading-[0.95] tracking-tight text-[color:var(--color-ink)] md:text-[7vw]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-line className="inline-block will-change-transform">
                {line.text}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span data-line className="inline-block italic will-change-transform">
              <span className="text-gold-gradient">Ativos reais</span> falam por si.
            </span>
          </span>
        </h2>

        <p
          data-meta
          className="mt-12 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-muted)] md:ml-auto md:text-right md:text-lg"
        >
          Construímos patrimônio em terra firme — onde o lastro é geológico, a
          auditoria é independente e a confiança não é um discurso, é um
          documento.
        </p>
      </div>
    </section>
  );
}
