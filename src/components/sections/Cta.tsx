"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Particles } from "@/components/ui/Particles";

export function Cta() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>("[data-l]");
      const sub = el.querySelector<HTMLElement>("[data-sub]");
      const buttons = el.querySelector<HTMLElement>("[data-btns]");
      const ring = el.querySelector<HTMLElement>("[data-ring]");

      gsap.set(lines, { yPercent: 110 });
      gsap.set(sub, { opacity: 0, y: 20 });
      gsap.set(buttons, { opacity: 0, y: 30 });
      gsap.set(ring, { opacity: 0, scale: 0.7 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(ring, {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
          })
            .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.08 }, "-=1.1")
            .to(sub, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
            .to(buttons, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");
        },
      });

      gsap.to(ring, {
        rotate: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[12vh]"
    >
      <Particles count={32} />

      <div
        data-ring
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full border border-[color:var(--color-gold-800)]/25" />
        <div className="absolute inset-[10%] rounded-full border border-[color:var(--color-gold-800)]/20" />
        <div className="absolute inset-[22%] rounded-full border border-[color:var(--color-gold-800)]/15" />
        <div className="absolute inset-[35%] rounded-full border border-[color:var(--color-gold-800)]/12" />
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,105,20,0.18)_0%,transparent_60%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 text-center md:px-10">
        <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
          <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
          Próximo passo
          <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
        </div>

        <h2 className="font-display text-[14vw] font-medium leading-[0.92] tracking-tight md:text-[7vw]">
          <span className="block overflow-hidden">
            <span data-l className="inline-block will-change-transform">
              Fale com um
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-l
              className="inline-block italic will-change-transform"
            >
              <span className="text-gold-gradient">consultor patrimonial</span>.
            </span>
          </span>
        </h2>

        <p
          data-sub
          className="mt-8 max-w-2xl text-balance text-base text-[color:var(--color-ink-muted)] md:text-lg"
        >
          Conheça os contratos CPOM®, simule cenários de valorização e
          entenda como participar das operações minerais. Sem compromisso.
        </p>

        <div
          data-btns
          className="mt-12 flex flex-col items-center gap-4 md:flex-row md:gap-6"
        >
          <MagneticButton
            href="https://wa.link/2ukykr"
            className="group relative overflow-hidden rounded-full border border-[color:var(--color-gold-800)] bg-[color:var(--color-gold-800)] px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[#f3eee2] transition-colors duration-500 hover:bg-[color:var(--color-gold-900)]"
          >
            Falar no WhatsApp
          </MagneticButton>

          <MagneticButton
            href="tel:08006066048"
            className="group relative overflow-hidden rounded-full border border-[color:var(--color-gold-800)]/60 bg-transparent px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--color-gold-800)] transition-colors duration-500 hover:border-[color:var(--color-gold-800)] hover:bg-[color:var(--color-gold-800)]/5"
          >
            0800 606 6048
          </MagneticButton>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-12 text-xs uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)] md:grid-cols-3">
          <div>
            <div className="mb-2 text-[10px] tracking-[0.3em] text-[color:var(--color-gold-800)]">
              Comercial
            </div>
            comercial@goldenbrasil.com.br
          </div>
          <div>
            <div className="mb-2 text-[10px] tracking-[0.3em] text-[color:var(--color-gold-800)]">
              SAC
            </div>
            (41) 98410-0552
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 text-[10px] tracking-[0.3em] text-[color:var(--color-gold-800)]">
              Atendimento
            </div>
            Seg–Sex · 8h–18h
          </div>
        </div>
      </div>
    </section>
  );
}
