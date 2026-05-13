"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  role?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Graças à minha participação na Golden Brasil, encontrei o crescimento patrimonial e a previsibilidade que buscava. Resultado total em 2024!",
    name: "Joan Gelor",
    handle: "@joangelor",
  },
  {
    quote:
      "Minha experiência com a Golden Brasil tem sido excepcional. Com uma entrada acessível, obtive uma valorização surpreendente.",
    name: "Marcos de Souza",
    handle: "@marcosdesouza651",
  },
  {
    quote:
      "Ampliar meu capital com a Golden Brasil foi a melhor decisão. Em quase dois anos, nunca me senti tão satisfeito.",
    name: "Guinter Schmidt",
    handle: "@guinterschmidt",
  },
  {
    quote:
      "O modelo contratual da Golden Brasil é transparente e bem estruturado. Acompanho tudo pelo aplicativo.",
    name: "Carlos Mendes",
    handle: "@carlosmendes",
  },
  {
    quote:
      "Profissionalismo e transparência em cada etapa. A equipe sempre disponível e o suporte impecável.",
    name: "Ana Paula Souza",
    handle: "@anapaulasouza",
  },
  {
    quote:
      "Já indiquei a Golden Brasil para toda minha família. A estrutura contratual é sólida e os resultados consistentes.",
    name: "Roberto Lima",
    handle: "@robertolima",
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-1 text-[color:var(--color-gold-200)]"
      aria-label="5 de 5 estrelas"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.5l2.95 6.7 7.05.7-5.3 4.95L18.2 22 12 18.27 5.8 22l1.5-7.15L2 9.9l7.05-.7L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Numeros() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      const stats = el.querySelectorAll<HTMLElement>("[data-stat]");
      const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
      const heading = el.querySelector<HTMLElement>("[data-heading]");

      gsap.set(eyebrow, { opacity: 0, y: 20 });
      gsap.set(heading, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 60 });
      gsap.set(stats, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
            .to(heading, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
            .to(
              cards,
              { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
              "-=0.4",
            )
            .to(
              stats,
              { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
              "-=0.5",
            );
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="numeros"
      ref={ref}
      className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[18vh]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div
          data-eyebrow
          className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]"
        >
          <span>05</span>
          <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
          <span>Resultados</span>
        </div>

        <h2
          data-heading
          className="mb-20 max-w-3xl font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[4.5vw]"
        >
          O que dizem os <span className="text-gold-gradient italic">clientes</span>.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-card
              className="group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-white/8 bg-[#141414] p-8 transition-colors duration-500 hover:border-[color:var(--color-gold-200)]/40 md:p-10"
            >
              <div className="flex items-center justify-between">
                <div className="text-5xl font-display leading-none text-[color:var(--color-gold-200)]">
                  “
                </div>
                <Stars />
              </div>
              <blockquote className="font-display text-lg italic leading-relaxed text-[#f5f1e6] md:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-white/8 pt-5">
                <div className="text-sm font-medium tracking-wide text-[#f5f1e6]">
                  {t.name}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-200)]">
                  {t.handle}
                </div>
              </figcaption>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,208,96,0.25)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </figure>
          ))}
        </div>

        {/* Soft trust band — alinhada com o site antigo */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)]/60 bg-[color:var(--color-border)]/40 md:grid-cols-4">
          {[
            { v: "8.000+", l: "Clientes ativos" },
            { v: "+9,0", l: "Reclame Aqui" },
            { v: "2019", l: "Operando desde" },
            { v: "BR", l: "Presença nacional" },
          ].map((s, i) => (
            <div
              key={i}
              data-stat
              className="flex flex-col gap-2 bg-[color:var(--color-bg)] p-8 md:p-10"
            >
              <div className="font-display text-3xl font-medium text-[color:var(--color-gold-800)] md:text-4xl">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Institutional row (regulação/auditoria) */}
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)]/40 bg-[color:var(--color-border)]/20 md:grid-cols-4">
          {[
            { v: "12", l: "Unidades de mineração" },
            { v: "ANM", l: "Regulação oficial" },
            { v: "SGS", l: "Auditoria independente" },
            { v: "0800", l: "Atendimento dedicado" },
          ].map((s, i) => (
            <div
              key={i}
              data-stat
              className="flex flex-col gap-2 bg-[color:var(--color-bg)]/60 p-6 md:p-8"
            >
              <div className="font-display text-2xl font-medium text-[color:var(--color-gold-800)] md:text-3xl">
                {s.v}
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
