"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

const services = [
  {
    tag: "Produto principal",
    title: "CPOM®",
    subtitle: "Contratos de Participação em Operações de Minério",
    description:
      "Tecnologia contratual proprietária que estrutura participação em reservas minerais. Janelas trimestrais, regras claras, transparência total.",
    bullets: [
      "Lastro real em minerais",
      "Auditoria SGS Geosol",
      "App oficial de acompanhamento",
      "Contratos privados regidos por lei",
    ],
    accent: "from-[#F0D060] via-[#C9A84C] to-[#8B6914]",
  },
  {
    tag: "Pedras certificadas",
    title: "Diamantes",
    subtitle: "Stones de alta pureza com certificação internacional",
    description:
      "Diamantes naturais com certificado de origem internacional. Valorização patrimonial atrelada ao mercado global de pedras preciosas.",
    bullets: [
      "Certificação internacional",
      "Origem rastreável",
      "Liquidez global",
      "Diversificação patrimonial",
    ],
    accent: "from-[#FBF6E5] via-[#E5C04A] to-[#A88838]",
  },
  {
    tag: "Direitos minerários",
    title: "Áreas de Mineração",
    subtitle: "Aquisição direta de áreas com alto potencial geológico",
    description:
      "Acesso a áreas e direitos minerários com geologia validada. Posicionamento estratégico no início da cadeia de valor mineral.",
    bullets: [
      "ANM — Agência Nacional de Mineração",
      "12 unidades em operação",
      "Estudos geológicos completos",
      "Tese de longo prazo",
    ],
    accent: "from-[#D4B358] via-[#A88838] to-[#5A440D]",
  },
  {
    tag: "Lista de espera",
    title: "Joias 24k",
    subtitle: "Peças exclusivas em ouro 24 quilates",
    description:
      "Joias de luxo em ouro 24k para diversificação patrimonial tangível. Edições limitadas, design autoral, certificação metalúrgica.",
    bullets: [
      "Ouro 24 quilates",
      "Edições limitadas",
      "Design autoral",
      "Diversificação tangível",
    ],
    accent: "from-[#F6E5A8] via-[#F0D060] via-50% to-[#B6953F]",
  },
];

export function Servicos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        // Use the last card to compute exact scroll distance — guarantees the
        // last card lands fully on-screen at scroll end.
        const computeDistance = () => {
          const cards = track.querySelectorAll<HTMLElement>("[data-card]");
          if (!cards.length) return 0;
          const last = cards[cards.length - 1];
          // 40px breathing room after the last card
          const lastRightInTrack = last.offsetLeft + last.offsetWidth + 40;
          return Math.max(0, lastRightInTrack - window.innerWidth);
        };

        let cachedDistance = computeDistance();
        const distance = () => cachedDistance;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              cachedDistance = computeDistance();
            },
            onUpdate: (self) => {
              if (progress) {
                progress.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        // Animate each card in as it scrolls into view
        const cards = track.querySelectorAll<HTMLElement>("[data-card]");
        cards.forEach((card) => {
          const inner = card.querySelectorAll<HTMLElement>("[data-i]");
          gsap.set(inner, { y: 30, opacity: 0 });
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tween,
            start: "left 70%",
            once: true,
            onEnter: () => {
              gsap.to(inner, {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: "expo.out",
              });
            },
          });
        });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)]"
    >
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-8 px-6 pt-[14vh] md:px-10">
        <div>
          <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
            <span>03</span>
            <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
            <span>Produtos</span>
          </div>
          <h2 className="font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[4vw]">
            Quatro portas para o <span className="text-gold-gradient italic">mesmo lastro</span>.
          </h2>
        </div>
        <div className="hidden text-right text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] md:block">
          Role para navegar
        </div>
      </div>

      <div className="relative pt-[10vh]">
        <div
          ref={trackRef}
          className="flex w-max flex-col gap-6 px-6 md:flex-row md:gap-10 md:pl-10 md:pr-[12vw]"
          style={{ willChange: "transform" }}
        >
          {services.map((s, i) => (
            <article
              key={i}
              data-card
              className="group relative flex w-[88vw] max-w-[760px] flex-shrink-0 flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-white/8 bg-[#141414] p-8 md:min-h-[78vh] md:w-[72vw] md:p-12"
            >
              <div
                aria-hidden
                className={`absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br ${s.accent} opacity-[0.25] blur-3xl transition-opacity duration-700 group-hover:opacity-45`}
              />

              <div className="relative flex flex-col gap-6">
                <div
                  data-i
                  className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-200)]"
                >
                  <span className="block h-px w-8 bg-[color:var(--color-gold-200)]" />
                  {s.tag}
                </div>
                <h3
                  data-i
                  className="font-display text-5xl font-medium leading-none md:text-7xl"
                >
                  <span className="text-gold-gradient">{s.title}</span>
                </h3>
                <p
                  data-i
                  className="max-w-xl text-balance text-base text-[#d4cebf] md:text-lg"
                >
                  {s.subtitle}
                </p>
                <p
                  data-i
                  className="max-w-xl text-sm leading-relaxed text-[#d4cebf]/70"
                >
                  {s.description}
                </p>
              </div>

              <div data-i className="relative mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {s.bullets.map((b, k) => (
                  <div
                    key={k}
                    className="bg-[#1c1c1c] px-5 py-4 text-xs text-[#d4cebf]"
                  >
                    <span className="mr-2 text-[color:var(--color-gold-200)]">◆</span>
                    {b}
                  </div>
                ))}
              </div>

              <div
                data-i
                className="relative mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold-200)]"
              >
                <span>Saber mais</span>
                <span className="inline-block h-px w-12 bg-[color:var(--color-gold-200)] transition-all duration-500 group-hover:w-24" />
              </div>
            </article>
          ))}
        </div>

        {/* Progress bar (desktop only) */}
        <div className="mx-auto mt-12 hidden h-px w-[80vw] max-w-[600px] overflow-hidden bg-[color:var(--color-border)] md:block">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-[color:var(--color-gold-800)] via-[color:var(--color-gold-500)] to-[color:var(--color-gold-800)] transition-transform duration-100"
          />
        </div>
        <div className="pb-[14vh]" />
      </div>
    </section>
  );
}
