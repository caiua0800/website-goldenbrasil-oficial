"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

const cols = [
  {
    title: "Produtos",
    links: [
      { label: "CPOM®", href: "#servicos" },
      { label: "Diamantes Certificados", href: "#servicos" },
      { label: "Áreas de Mineração", href: "#servicos" },
      { label: "Joias 24k", href: "#servicos" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Quem Somos", href: "#sobre" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Resultados", href: "#numeros" },
      { label: "Blog", href: "https://blog.goldenbrasil.com.br" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Fale com Consultor", href: "https://wa.link/2ukykr" },
      { label: "SAC: (41) 98410-0552", href: "tel:4198410552" },
      { label: "Comercial: 0800 606 6048", href: "tel:08006066048" },
      { label: "comercial@goldenbrasil.com.br", href: "mailto:comercial@goldenbrasil.com.br" },
    ],
  },
];

export function Footer() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>("[data-f]");
      gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      className="relative border-t border-[color:var(--color-border)]/60 bg-[color:var(--color-bg-deeper)] pt-[10vh] pb-12"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div data-f className="md:col-span-5">
            <div className="font-display text-3xl font-medium md:text-4xl">
              <span className="text-gold-gradient">Golden</span> Brasil
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
              Holding referência nacional em ativos minerais.
              Segurança e valorização patrimonial em ativos reais.
            </p>

            <div className="mt-8 flex flex-col gap-2 text-xs text-[color:var(--color-ink-muted)]">
              <div>
                <span className="mr-2 text-[color:var(--color-gold-800)]">◆</span>
                Sede: Balneário Camboriú, SC
              </div>
              <div>
                <span className="mr-2 text-[color:var(--color-gold-800)]">◆</span>
                Presença: São Paulo, Curitiba e Rio Grande do Sul
              </div>
              <div>
                <span className="mr-2 text-[color:var(--color-gold-800)]">◆</span>
                CNPJ: 42.007.698/0001-17
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["ANM", "SGS Geosol", "Intertek"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[color:var(--color-border)] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div data-f key={col.title} className="md:col-span-2 md:col-start-auto">
              <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-underline text-sm text-[color:var(--color-ink-muted)] transition-colors hover:text-[color:var(--color-ink)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          data-f
          className="mt-16 flex flex-col gap-4 border-t border-[color:var(--color-border)]/40 pt-8 text-[11px] text-[color:var(--color-ink-dim)] md:flex-row md:items-center md:justify-between"
        >
          <div>
            © {new Date().getFullYear()} Holding Golden Brasil. Todos os
            direitos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="hover:text-[color:var(--color-ink)]">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-[color:var(--color-ink)]">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-[color:var(--color-ink)]">
              Compliance
            </a>
          </div>
        </div>

        <div
          data-f
          className="mt-8 max-w-3xl text-[10px] leading-relaxed text-[color:var(--color-ink-dim)]"
        >
          <strong className="text-[color:var(--color-ink-muted)]">Aviso legal:</strong>{" "}
          Golden Brasil não atua como instituição financeira. Os CPOM® são
          contratos privados de participação em operações de minério,
          regidos por legislação brasileira aplicável a contratos comerciais
          privados, e não constituem oferta pública de valores mobiliários
          ou produto financeiro regulado pela CVM.
        </div>
      </div>
    </footer>
  );
}
