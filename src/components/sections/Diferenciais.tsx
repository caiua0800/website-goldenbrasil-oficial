"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

const items = [
  {
    n: "01",
    title: "Lastro real, geológico",
    body: "Cada contrato CPOM® é amarrado a reservas minerais físicas, avaliadas por estudos geológicos. Não negociamos promessas — negociamos terra.",
    detail: "12 unidades em operação",
  },
  {
    n: "02",
    title: "Auditoria independente",
    body: "Verificações periódicas conduzidas por SGS Geosol e Intertek Auditoria. Sob o regramento da Agência Nacional de Mineração.",
    detail: "SGS · Intertek · ANM",
  },
  {
    n: "03",
    title: "Segurança jurídica",
    body: "Contratos privados regidos por lei brasileira, com regras claras de participação, prazos e janelas trimestrais. Sem zonas cinzentas.",
    detail: "Contratos privados",
  },
  {
    n: "04",
    title: "Transparência completa",
    body: "App oficial para acompanhamento da operação. Histórico, documentos, relatórios e janela direta de comunicação — disponíveis 24/7.",
    detail: "iOS · Android",
  },
];

export function Diferenciais() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
      const lead = el.querySelector<HTMLElement>("[data-lead]");
      const rows = el.querySelectorAll<HTMLElement>("[data-row]");

      gsap.set(eyebrow, { opacity: 0, y: 20 });
      gsap.set(lead, { opacity: 0, y: 30 });
      gsap.set(rows, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
            .to(lead, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
            .to(rows, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, "-=0.4");
        },
      });

      // Parallax accent line scaling
      rows.forEach((row) => {
        const accent = row.querySelector<HTMLElement>("[data-accent]");
        if (!accent) return;
        gsap.fromTo(
          accent,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="diferenciais"
      ref={ref}
      className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg)] py-[18vh]"
    >
      {/* Full-bleed gold-bar background — original orientation: bar on left,
          cream on right (where content sits). */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="/diferenciais-bg.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Cream wash overlay — heavier on the right where text lives, lighter
          on the left so the gold bar shows through. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[color:var(--color-bg)]/40 to-[color:var(--color-bg)]/85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--color-bg)]/30 via-transparent to-[color:var(--color-bg)]/45"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Headline shifted to the RIGHT half so it doesn't overlap the
              gold bar on the left of the bg image. */}
          <div className="md:col-span-6 md:col-start-7">
            <div
              data-eyebrow
              className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]"
            >
              <span>04</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Diferenciais</span>
            </div>
            <h2
              data-lead
              className="font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[3.2vw]"
            >
              Confiança que se <span className="text-gold-gradient italic">audita</span>,<br />
              valor que se <span className="text-gold-gradient italic">extrai</span>.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="flex flex-col">
              {items.map((it, i) => (
                <div
                  key={i}
                  data-row
                  className="group relative grid grid-cols-12 items-start gap-6 border-t border-[color:var(--color-border)]/60 py-10 transition-colors duration-500 hover:bg-[color:var(--color-surface)]/40"
                >
                  <div className="col-span-2 font-display text-3xl text-[color:var(--color-gold-800)] md:text-4xl">
                    {it.n}
                  </div>
                  <div className="col-span-10 flex flex-col gap-3">
                    <h3 className="font-display text-2xl font-medium md:text-3xl">
                      {it.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                      {it.body}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                      <span
                        data-accent
                        className="block h-px w-16 origin-left bg-gradient-to-r from-[color:var(--color-gold-800)] to-[color:var(--color-gold-500)]"
                      />
                      {it.detail}
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-px w-full bg-[color:var(--color-border)]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
