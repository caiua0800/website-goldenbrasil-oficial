import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Nosso portfólio de produtos físicos e digitais: Diamond Prime, CPOM®, Áreas de Mineração e Joias de Luxo. Investimentos tangíveis com certificação internacional.",
};

const IMG = "https://goldenbrasil.com.br/novo/images";

type Product = {
  tag: string;
  title: string;
  subtitle?: string;
  desc: string;
  bullets: string[];
  img: string;
  cta: { label: string; href: string };
  highlight?: boolean;
  soon?: boolean;
};

const products: Product[] = [
  {
    tag: "Produto Físico · IGL Certified",
    title: "Diamond Prime",
    subtitle: "Diamantes naturais com certificação internacional",
    desc: "Produto físico da Golden Brasil. O cliente recebe o diamante em casa, com certificação internacional IGL e acompanhamento por site próprio. Não está vinculado ao aplicativo da Golden Brasil.",
    bullets: [
      "Certificação IGL internacional",
      "Recebimento físico do diamante",
      "Acompanhamento via site dedicado",
      "Liquidez no mercado global",
    ],
    img: `${IMG}/img-28.jpg`,
    cta: { label: "Visitar Diamond Prime", href: "https://www.diamondprime.com.br" },
  },
  {
    tag: "Produto Principal",
    title: "CPOM®",
    subtitle: "Contratos de Participação em Operações de Minério",
    desc: "O principal modelo contratual da Golden Brasil. Contrato privado de natureza comercial, com participação em operações minerais administradas pela empresa. Vigência de 36 meses. Não se trata de produto financeiro.",
    bullets: [
      "Vigência de 36 meses",
      "Lastro em operações minerais reais",
      "Auditoria SGS Geosol e Intertek",
      "App oficial de acompanhamento",
    ],
    img: `${IMG}/img-29.jpg`,
    cta: { label: "Saber mais", href: "https://goldenbrasil.com.br/cpom/" },
    highlight: true,
  },
  {
    tag: "Direitos Minerários",
    title: "Áreas de Mineração",
    subtitle: "Aquisição direta em regiões com geologia validada",
    desc: "Atuação direta em áreas de mineração em diferentes regiões do Brasil, com comercialização de minérios e inserção em cadeias produtivas reais.",
    bullets: [
      "Regulação ANM",
      "12 unidades em operação",
      "Estudos geológicos validados",
      "Cadeia produtiva real",
    ],
    img: `${IMG}/img-30.jpg`,
    cta: { label: "Fale Conosco", href: "https://wa.link/2ukykr" },
  },
  {
    tag: "Exclusividade & Design · Em Breve",
    title: "Joias de Luxo",
    subtitle: "Peças exclusivas em ouro 24k com propósito patrimonial",
    desc: "Em breve: peças exclusivas que unem design sofisticado e potencial de valorização de longo prazo. Cada joia é um ativo com propósito.",
    bullets: [
      "Ouro 24 quilates",
      "Edições limitadas",
      "Design autoral",
      "Lista de espera",
    ],
    img: `${IMG}/img-31.jpg`,
    cta: { label: "Entrar na lista", href: "https://wa.link/2ukykr" },
    soon: true,
  },
];

export default function ProdutosPage() {
  return (
    <main className="relative bg-[color:var(--color-bg)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-[18vh] pb-[10vh] md:pt-[22vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-800)]">
              <span className="block h-px w-12 bg-[color:var(--color-gold-800)]" />
              Portfólio
            </div>
            <h1 className="max-w-5xl font-display text-[10vw] font-medium leading-[0.95] tracking-tight md:text-[5.5vw]">
              Produtos físicos e digitais com{" "}
              <span className="text-gold-gradient italic">lastro real</span>.
            </h1>
            <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
              A segurança do lastro físico unida à sofisticação da gestão de
              patrimônio soberana. Explore nossas soluções exclusivas com
              certificação internacional.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="mt-16 overflow-hidden rounded-3xl border border-[color:var(--color-border)]" delay={0.2}>
            <img
              src={`${IMG}/img-27.jpg`}
              alt="Joias de luxo e documentos de certificação"
              className="aspect-[16/8] w-full object-cover"
              loading="eager"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[12vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span>01</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Soluções de Alto Padrão</span>
            </div>
            <h2 className="max-w-3xl font-display text-[7vw] font-medium leading-[0.95] tracking-tight md:text-[3.5vw]">
              Quatro produtos. Um único <span className="text-gold-gradient italic">lastro</span>.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
              Investimentos tangíveis com certificação internacional, contratos
              privados claros e operações auditadas por terceiros.
            </p>
          </RevealOnScroll>

          <div className="mt-20 flex flex-col gap-10">
            {products.map((p, i) => (
              <RevealOnScroll
                key={p.title}
                delay={(i % 2) * 0.1}
                className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#141414]"
              >
                <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
                  <div
                    className={`relative overflow-hidden ${i % 2 ? "md:order-2" : ""}`}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-105 md:aspect-auto md:h-full"
                      loading="lazy"
                    />
                    {p.soon && (
                      <span className="absolute left-6 top-6 rounded-full bg-[color:var(--color-gold-800)] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[#f3eee2]">
                        Em breve
                      </span>
                    )}
                    {p.highlight && (
                      <span className="absolute left-6 top-6 rounded-full bg-[#f3eee2] px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-900)]">
                        Carro-chefe
                      </span>
                    )}
                  </div>

                  <div className="relative flex flex-col justify-between p-8 md:p-14">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-200)]">
                        {p.tag}
                      </div>
                      <h3 className="mt-5 font-display text-5xl font-medium leading-none md:text-6xl">
                        <span className="text-gold-gradient">{p.title}</span>
                      </h3>
                      {p.subtitle && (
                        <p className="mt-5 text-balance text-base text-[#d4cebf] md:text-lg">
                          {p.subtitle}
                        </p>
                      )}
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#d4cebf]/75">
                        {p.desc}
                      </p>

                      <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-2">
                        {p.bullets.map((b) => (
                          <li
                            key={b}
                            className="bg-[#1c1c1c] px-5 py-4 text-xs text-[#d4cebf]"
                          >
                            <span className="mr-2 text-[color:var(--color-gold-200)]">
                              ◆
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10">
                      <MagneticButton
                        href={p.cta.href}
                        className="inline-flex rounded-full border border-[color:var(--color-gold-200)]/40 bg-[color:var(--color-gold-200)]/10 px-7 py-4 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-gold-200)] transition-colors duration-500 hover:border-[color:var(--color-gold-200)] hover:bg-[color:var(--color-gold-200)]/20"
                      >
                        {p.cta.label}
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[14vh]">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <RevealOnScroll>
            <div className="mb-8 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
              Próximo passo
              <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
            </div>
            <h2 className="font-display text-[10vw] font-medium leading-[0.92] tracking-tight md:text-[5vw]">
              Pronto para <span className="text-gold-gradient italic">diversificar</span>?
            </h2>
            <p className="mt-8 max-w-2xl text-balance text-base text-[color:var(--color-ink-muted)] md:mx-auto md:text-lg">
              Nossos consultores estão prontos para oferecer um atendimento
              personalizado e sigiloso sobre as melhores oportunidades em
              ativos reais.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
              <MagneticButton
                href="https://wa.link/2ukykr"
                className="rounded-full border border-[color:var(--color-gold-800)] bg-[color:var(--color-gold-800)] px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[#f3eee2] transition-colors duration-500 hover:bg-[color:var(--color-gold-900)]"
              >
                Falar no WhatsApp
              </MagneticButton>
              <MagneticButton
                href="tel:08006066048"
                className="rounded-full border border-[color:var(--color-gold-800)]/60 bg-transparent px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[color:var(--color-gold-800)] transition-colors duration-500 hover:border-[color:var(--color-gold-800)] hover:bg-[color:var(--color-gold-800)]/5"
              >
                0800 606 6048
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
