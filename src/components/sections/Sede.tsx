"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

const photos = [
  "/visitas-clientes/img1.jpg",
  "/visitas-clientes/img2.jpg",
  "/visitas-clientes/img3.jpg",
  "/visitas-clientes/img4.jpg",
  "/visitas-clientes/iimg5.jpg",
  "/visitas-clientes/img6.jpg",
  "/visitas-clientes/img7.jpg",
  "/visitas-clientes/img8.jpg",
  "/visitas-clientes/img9.jpg",
];

export function Sede() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const eyebrow = el.querySelector<HTMLElement>("[data-eyebrow]");
      const heading = el.querySelector<HTMLElement>("[data-heading]");
      const lead = el.querySelector<HTMLElement>("[data-lead]");
      const cards = el.querySelectorAll<HTMLElement>("[data-tile]");

      gsap.set(eyebrow, { opacity: 0, y: 20 });
      gsap.set(heading, { opacity: 0, y: 30 });
      gsap.set(lead, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7 })
            .to(heading, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
            .to(lead, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
            .to(
              cards,
              { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 },
              "-=0.4",
            );
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        cards.forEach((card) => {
          const onEnter = () =>
            gsap.to(card, {
              y: -6,
              duration: 0.4,
              ease: "power3.out",
            });
          const onLeave = () =>
            gsap.to(card, { y: 0, duration: 0.5, ease: "power3.out" });
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
          return () => {
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sede"
      ref={ref}
      className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[18vh]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div
              data-eyebrow
              className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]"
            >
              <span>06</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Visitas à Sede</span>
            </div>
            <h2
              data-heading
              className="font-display text-[9vw] font-medium leading-[0.95] tracking-tight md:text-[4.5vw]"
            >
              Nossa porta está <span className="text-gold-gradient italic">aberta</span>.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p
              data-lead
              className="text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg"
            >
              Clientes visitam a sede da Holding em Balneário Camboriú (SC)
              para conhecer a operação, conversar com a diretoria e validar
              cada detalhe do contrato. Lastro real é algo que se vê.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {photos.map((src, i) => (
            <figure
              key={src}
              data-tile
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[#1a1408] will-change-transform"
            >
              <img
                src={src}
                alt={`Cliente na sede Golden Brasil — visita ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-700 group-hover:ring-[color:var(--color-gold-200)]/40"
              />
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-dim)]">
          Holding Golden Brasil · Balneário Camboriú · SC
        </p>
      </div>
    </section>
  );
}
