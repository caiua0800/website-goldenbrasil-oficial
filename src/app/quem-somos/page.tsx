import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CharReveal } from "@/components/ui/CharReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Marquee } from "@/components/ui/Marquee";
import { Counter } from "@/components/ui/Counter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CitiesCinematic } from "@/components/sections/CitiesCinematic";
import { QuemSomosHero } from "@/components/sections/QuemSomosHero";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "A Golden Brasil é um grupo empresarial brasileiro que atua no setor de minérios e pedras preciosas, com foco em operações reais, ativos físicos e estrutura contratual privada. Referência nacional desde 2019.",
};

const IMG = "https://goldenbrasil.com.br/novo/images";

const valuationStats = [
  { to: 490, prefix: "R$ ", suffix: "Mi+", label: "Enterprise Value", decimals: 0 },
  { to: 493, prefix: "R$ ", suffix: "Mi", label: "Valuation", decimals: 0 },
  { to: 115, prefix: "R$ ", suffix: "Mi+", label: "Balanço patrimonial", decimals: 0 },
  { to: 50, prefix: "R$ ", suffix: "Mi", label: "Capital social", decimals: 0 },
];

const values = [
  "Ambição com propósito",
  "Acessibilidade",
  "Excelência",
  "Inovação",
  "Transparência",
  "Paixão",
  "Responsabilidade social",
];

export default function QuemSomosPage() {
  return (
    <main className="relative bg-[color:var(--color-bg)]">
      {/* HERO — video bg (gold bar) + cinematic scroll choreography */}
      <QuemSomosHero />

      {/* Hero supporting image — parallax + clip reveal */}
      <section className="relative pb-[12vh] pt-[6vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <ParallaxImage
            src={`${IMG}/img-33.jpg`}
            alt="Arquitetura corporativa Golden Brasil"
            className="aspect-[16/8] w-full rounded-3xl border border-[color:var(--color-border)]"
            imgClassName="scale-[1.15]"
            amount={120}
            reveal
          />
        </div>
      </section>

      {/* VALUATION METRICS — animated counters with gold rule */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[16vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span>01</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Indicadores Patrimoniais</span>
            </div>
            <h2 className="max-w-3xl font-display text-[7vw] font-medium leading-[0.95] tracking-tight md:text-[3.5vw]">
              <CharReveal
                text="Solidez que se mede em números."
                accent={{
                  match: "números",
                  className: "text-[color:var(--color-gold-800)] italic",
                }}
                stagger={0.018}
              />
            </h2>
          </RevealOnScroll>

          <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[color:var(--color-border)]/60 bg-[color:var(--color-border)]/40 sm:grid-cols-2 lg:grid-cols-4">
            {valuationStats.map((s, i) => (
              <RevealOnScroll
                key={i}
                delay={i * 0.1}
                className="group relative flex flex-col gap-5 bg-[color:var(--color-bg)] p-10 md:p-12"
              >
                <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-gold-800)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display text-5xl font-medium leading-none text-[color:var(--color-gold-800)] md:text-6xl">
                  <Counter
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
                  {s.label}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold-800)]/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <p className="mt-14 max-w-2xl text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              A Golden Brasil não atua como instituição financeira. Sua tese de
              valorização patrimonial é baseada em operações minerais reais e
              estrutura contratual privada, regida por legislação brasileira
              aplicável a contratos comerciais.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* MARQUEE de valores — luxury infinite scroll */}
      <section className="relative overflow-hidden border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-20">
        <Marquee duration={42} className="text-[color:var(--color-gold-800)]">
          {values.concat(values).map((v, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-display text-3xl italic md:text-5xl"
            >
              {v}
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-gold-800)]/70"
              />
            </span>
          ))}
        </Marquee>
      </section>

      {/* FUNDAMENTOS — Missão / Visão side-by-side asymmetric */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[16vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-14 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span>02</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Fundamentos</span>
            </div>
            <h2 className="max-w-4xl font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[4.5vw]">
              <CharReveal
                text="O que nos move."
                accent={{
                  match: "nos move",
                  className: "text-[color:var(--color-gold-800)] italic",
                }}
                stagger={0.025}
              />
            </h2>
          </RevealOnScroll>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <RevealOnScroll className="md:col-span-7 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-12 md:p-16">
              <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
                Missão
              </div>
              <p className="mt-8 font-display text-3xl leading-snug md:text-4xl">
                Transformar o acesso a minérios e pedras preciosas em uma
                <span className="text-gold-gradient italic"> experiência confiável</span>,
                com expansão patrimonial real e responsabilidade social.
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.15}
              className="md:col-span-5 md:mt-20 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-10 md:p-12"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
                Visão
              </div>
              <p className="mt-8 font-display text-2xl leading-snug md:text-3xl">
                Consolidar a Golden Brasil como
                <span className="text-gold-gradient italic"> referência nacional e internacional</span>,
                com crescimento sustentável e compromisso com o
                desenvolvimento humano.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CITIES — cinematic pinned section with image swap */}
      <CitiesCinematic
        cities={[
          {
            img: `${IMG}/img-34.jpg`,
            name: "Balneário Camboriú",
            tag: "Sede administrativa",
            desc: "O epicentro de nossos negócios. Onde a estratégia se traduz em operação.",
            state: "Santa Catarina",
          },
          {
            img: `${IMG}/img-35.jpg`,
            name: "São Paulo",
            tag: "Hub estratégico",
            desc: "Conectados ao coração corporativo do Brasil.",
            state: "São Paulo",
          },
          {
            img: `${IMG}/img-36.jpg`,
            name: "Curitiba",
            tag: "Unidade PR",
            desc: "Presença estratégica no Sul do Brasil.",
            state: "Paraná",
          },
          {
            img: `${IMG}/img-37.jpg`,
            name: "Rio Grande do Sul",
            tag: "Unidade RS",
            desc: "Foco em mineração e ativos estruturados.",
            state: "Rio Grande do Sul",
          },
        ]}
      />

      {/* ELITE DE ESPECIALISTAS — image parallax + char reveal */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[16vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <ParallaxImage
                src={`${IMG}/img-38.jpg`}
                alt="Equipe Golden Brasil"
                className="aspect-[4/5] w-full rounded-3xl border border-[color:var(--color-border)]"
                imgClassName="scale-[1.12]"
                amount={100}
                reveal
              />
            </div>

            <div className="md:col-span-6">
              <RevealOnScroll y={20}>
                <div className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
                  <span>04</span>
                  <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
                  <span>Nossa Inteligência</span>
                </div>
              </RevealOnScroll>

              <h2 className="font-display text-[10vw] font-medium leading-[0.92] tracking-tight md:text-[5vw]">
                <span className="block">
                  <CharReveal text="Elite de" />
                </span>
                <span className="block">
                  <CharReveal
                    text="especialistas."
                    accent={{
                      match: "especialistas",
                      className: "text-[color:var(--color-gold-800)] italic",
                    }}
                    stagger={0.025}
                    delay={0.15}
                  />
                </span>
              </h2>

              <RevealOnScroll delay={0.3} y={30}>
                <p className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
                  Geólogos, economistas e especialistas em direito minerário
                  compõem um time autoral. Nossa equipe é o maior ativo da
                  Golden Brasil — porque lastro real começa com gente que
                  entende de terra, contrato e patrimônio.
                </p>

                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                  <span className="flex items-center gap-2">
                    <span className="block h-px w-6 bg-[color:var(--color-gold-800)]" />
                    Geologia
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="block h-px w-6 bg-[color:var(--color-gold-800)]" />
                    Economia
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="block h-px w-6 bg-[color:var(--color-gold-800)]" />
                    Direito Minerário
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="block h-px w-6 bg-[color:var(--color-gold-800)]" />
                    Compliance
                  </span>
                </div>

                <div className="mt-12">
                  <MagneticButton
                    href="https://wa.link/2ukykr"
                    className="rounded-full border border-[color:var(--color-gold-800)] bg-[color:var(--color-gold-800)] px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[#f3eee2] transition-colors duration-500 hover:bg-[color:var(--color-gold-900)]"
                  >
                    Fale com um consultor
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
