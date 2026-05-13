import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Depoimentos",
  description:
    "Mais de 8.000 clientes confiam na Golden Brasil para expandir e proteger seu patrimônio. Veja histórias reais de quem escolheu ativos minerais auditados.",
};

const IMG = "https://goldenbrasil.com.br/novo/images";

type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  photo: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Graças à minha participação na Golden Brasil, encontrei o crescimento patrimonial e a previsibilidade que buscava. Resultado total em 2024!",
    name: "Joan Gelor",
    handle: "@joangelor",
    photo: `${IMG}/img-10.jpg`,
  },
  {
    quote:
      "Minha experiência com a Golden Brasil tem sido excepcional. Com uma entrada acessível, obtive uma valorização surpreendente.",
    name: "Marcos de Souza",
    handle: "@marcosdesouza651",
    photo: `${IMG}/img-11.jpg`,
  },
  {
    quote:
      "Ampliar meu capital com a Golden Brasil foi a melhor decisão. Em quase dois anos, nunca me senti tão satisfeito.",
    name: "Guinter Schmidt",
    handle: "@guinterschmidt",
    photo: `${IMG}/img-12.jpg`,
  },
  {
    quote:
      "O modelo contratual da Golden Brasil é transparente e bem estruturado. Acompanho tudo pelo aplicativo.",
    name: "Carlos Mendes",
    handle: "@carlosmendes",
    photo: `${IMG}/img-13.jpg`,
  },
  {
    quote:
      "Profissionalismo e transparência em cada etapa. A equipe sempre disponível e o suporte impecável.",
    name: "Ana Paula Souza",
    handle: "@anapaulasouza",
    photo: `${IMG}/img-14.jpg`,
  },
  {
    quote:
      "Já indiquei a Golden Brasil para toda minha família. A estrutura contratual é sólida e os resultados consistentes.",
    name: "Roberto Lima",
    handle: "@robertolima",
    photo: `${IMG}/img-15.jpg`,
  },
];

const sedePhotos = Array.from({ length: 9 }).map((_, i) => ({
  src: `${IMG}/img-${16 + i}.jpg`,
  alt: `Cliente na sede Golden Brasil — visita ${i + 1}`,
}));

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

export default function DepoimentosPage() {
  return (
    <main className="relative bg-[color:var(--color-bg)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-[18vh] pb-[10vh] md:pt-[22vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
            <RevealOnScroll className="md:col-span-7">
              <div className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-800)]">
                <span className="block h-px w-12 bg-[color:var(--color-gold-800)]" />
                Histórias Reais
              </div>
              <h1 className="font-display text-[10vw] font-medium leading-[0.95] tracking-tight md:text-[5.5vw]">
                Histórias reais de quem escolheu a{" "}
                <span className="text-gold-gradient italic">Golden Brasil</span>.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll className="md:col-span-5" delay={0.15}>
              <p className="text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
                Mais de 8.000 clientes confiam na Golden Brasil para expandir e
                proteger seu patrimônio através de estratégias sólidas e
                transparentes.
              </p>
            </RevealOnScroll>
          </div>

          {/* Trust band */}
          <RevealOnScroll delay={0.25} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)]/60 bg-[color:var(--color-border)]/40 md:grid-cols-4">
            {[
              { v: "8.000+", l: "Clientes ativos" },
              { v: "+9,0", l: "Reclame Aqui" },
              { v: "2019", l: "Operando desde" },
              { v: "BR", l: "Presença nacional" },
            ].map((s) => (
              <div
                key={s.l}
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
          </RevealOnScroll>
        </div>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[12vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span>01</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Vozes dos Clientes</span>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((t, i) => (
              <RevealOnScroll
                key={i}
                delay={(i % 3) * 0.08}
                className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/8 bg-[#141414] p-8 transition-colors duration-500 hover:border-[color:var(--color-gold-200)]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-14 w-14 rounded-full border border-[color:var(--color-gold-200)]/30 object-cover"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-sm font-medium tracking-wide text-[#f5f1e6]">
                        {t.name}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-200)]">
                        {t.handle}
                      </div>
                    </div>
                  </div>
                  <Stars />
                </div>
                <blockquote className="flex-1 font-display text-lg italic leading-relaxed text-[#f5f1e6]">
                  <span className="text-4xl leading-none text-[color:var(--color-gold-200)]">
                    “
                  </span>
                  {t.quote}
                </blockquote>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,208,96,0.22)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* VISITAS À SEDE */}
      <section className="relative border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[14vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span>02</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-800)]" />
              <span>Clientes que nos visitaram</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
              <h2 className="md:col-span-7 font-display text-[8vw] font-medium leading-[0.95] tracking-tight md:text-[4.5vw]">
                Transparência começa com{" "}
                <span className="text-gold-gradient italic">portas abertas</span>.
              </h2>
              <p className="md:col-span-5 text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
                Clientes vêm conhecer a sede em Balneário Camboriú,
                conversar com a diretoria e validar cada detalhe do contrato.
                Lastro real é algo que se vê.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {sedePhotos.map((p, i) => (
              <RevealOnScroll
                key={i}
                delay={(i % 3) * 0.06}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[#1a1408]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-200)]">
                    Visita à sede
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#f5f1e6]">
                    Balneário Camboriú · SC
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-[color:var(--color-border)]/50 py-[14vh]">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <RevealOnScroll>
            <div className="mb-8 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]">
              <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
              Faça parte dessa história
              <span className="h-px w-8 bg-[color:var(--color-gold-800)]" />
            </div>
            <h2 className="font-display text-[10vw] font-medium leading-[0.92] tracking-tight md:text-[5vw]">
              Sua confiança merece <span className="text-gold-gradient italic">lastro real</span>.
            </h2>
            <p className="mt-8 max-w-2xl text-balance text-base text-[color:var(--color-ink-muted)] md:mx-auto md:text-lg">
              Converse com um consultor patrimonial. Sem compromisso, sem
              pressão — apenas informação clara sobre como participar das
              operações minerais.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
              <MagneticButton
                href="https://wa.link/2ukykr"
                className="rounded-full border border-[color:var(--color-gold-800)] bg-[color:var(--color-gold-800)] px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[#f3eee2] transition-colors duration-500 hover:bg-[color:var(--color-gold-900)]"
              >
                Falar com um consultor
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
