"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { Counter } from "@/components/ui/Counter";

export function Sobre() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
      const lines = el.querySelectorAll<HTMLElement>("[data-l]");
      const lead = el.querySelector<HTMLElement>("[data-lead]");
      const stats = el.querySelectorAll<HTMLElement>("[data-stat]");

      gsap.set(eyebrow, { opacity: 0, y: 20 });
      gsap.set(lines, { yPercent: 110 });
      gsap.set(lead, { opacity: 0, y: 30 });
      gsap.set(stats, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
            .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.07 }, "-=0.3")
            .to(lead, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
            .to(stats, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, "-=0.5");
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      to: 490,
      prefix: "R$ ",
      suffix: "M+",
      label: "Valuation da holding",
    },
    {
      to: 1.2,
      prefix: "R$ ",
      suffix: "B+",
      decimals: 1,
      label: "Em balanço patrimonial",
    },
    {
      to: 98,
      suffix: "%",
      label: "Renovação de contratos",
    },
    {
      to: 9.0,
      suffix: "+",
      decimals: 1,
      label: "Reclame Aqui (nota)",
    },
  ];

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg)] py-[18vh]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              data-eyebrow
              className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]"
            >
              <span>02</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Quem Somos</span>
            </div>

            <h2 className="font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[4.5vw]">
              <span className="block overflow-hidden">
                <span data-l className="inline-block will-change-transform">
                  Referência nacional
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-l className="inline-block italic will-change-transform">
                  <span className="text-gold-gradient">em inovação mineral</span>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-l className="inline-block will-change-transform">
                  desde 2019.
                </span>
              </span>
            </h2>
          </div>

          <div className="md:col-span-5 md:pt-32">
            <p
              data-lead
              className="text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg"
            >
              A Holding Golden Brasil é líder em inovação no mercado de ativos
              minerais. Democratizamos o acesso aos ativos mais valiosos do
              planeta através de tecnologia contratual, transparência e lastro
              real. Sede em Balneário Camboriú (SC), com presença em São Paulo,
              Curitiba e Rio Grande do Sul.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)]/60 bg-[color:var(--color-border)]/40 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              data-stat
              className="group relative flex flex-col gap-3 bg-[color:var(--color-bg)] p-8 transition-colors duration-500 hover:bg-[color:var(--color-surface)] md:p-12"
            >
              <div className="font-display text-5xl font-medium leading-none text-[color:var(--color-ink)] md:text-6xl">
                <Counter
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
                {s.label}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold-500)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
