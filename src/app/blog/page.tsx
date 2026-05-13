import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Análises e bastidores do mercado mineral: ouro, diamantes, joias e mineração. Conteúdo da Holding Golden Brasil sobre o setor de ativos reais.",
};

type Post = {
  title: string;
  excerpt: string;
  date: string; // ISO
  dateLabel: string; // pt-BR
  category: string;
  href: string;
  image?: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    title:
      "Integração entre ouro, diamantes e joias amplia atuação da Golden Brasil no setor mineral",
    excerpt:
      "Atuação que conecta recursos naturais à produção de joias reforça presença da empresa em diferentes etapas da cadeia produtiva.",
    date: "2026-03-27",
    dateLabel: "27 Mar 2026",
    category: "Estratégia",
    href: "https://goldenbrasil.com.br/integracao-entre-ouro-diamantes-e-joias-amplia-atuacao-da-golden-brasil-no-setor-mineral/",
    featured: true,
  },
  {
    title:
      "Demanda por minerais estratégicos cresce com avanço tecnológico e impulsiona setor global",
    excerpt:
      "Expansão de tecnologias digitais e energéticas aumenta a necessidade por recursos naturais utilizados em diferentes cadeias produtivas.",
    date: "2026-03-25",
    dateLabel: "25 Mar 2026",
    category: "Minerais Estratégicos",
    href: "https://goldenbrasil.com.br/demanda-por-minerais-estrategicos-cresce-com-avanco-tecnologico-e-impulsiona-setor-global/",
  },
  {
    title:
      "Mercado de joias no Brasil deve crescer mais de 8% ao ano e reforça importância do setor",
    excerpt:
      "Projeções indicam expansão consistente do segmento, impulsionada pela demanda por ouro e pedras preciosas nos próximos anos.",
    date: "2026-03-20",
    dateLabel: "20 Mar 2026",
    category: "Joias",
    href: "https://goldenbrasil.com.br/mercado-de-joias-no-brasil-deve-crescer-mais-de-8-ao-ano-e-reforca-importancia-do-setor/",
  },
  {
    title:
      "Mineração movimenta bilhões e mantém papel estratégico na economia brasileira",
    excerpt:
      "Setor mineral representa parcela relevante das exportações do país e conecta o Brasil ao mercado global de recursos naturais.",
    date: "2026-03-20",
    dateLabel: "20 Mar 2026",
    category: "Mineração",
    href: "https://goldenbrasil.com.br/mineracao-movimenta-bilhoes-e-mantem-papel-estrategico-na-economia-brasileira/",
  },
  {
    title:
      "Golden Brasil envia mais de R$ 200 mil em ouro em ações de relacionamento com clientes",
    excerpt:
      "Barras de ouro fazem parte de iniciativas realizadas pela empresa como forma de reconhecimento aos clientes que participam das operações.",
    date: "2026-03-13",
    dateLabel: "13 Mar 2026",
    category: "Bastidores",
    href: "https://goldenbrasil.com.br/golden-brasil-envia-mais-de-r-200-mil-em-ouro-em-acoes-de-relacionamento-com-clientes/",
  },
  {
    title:
      "Bancos centrais ampliam reservas de ouro e reforçam papel do metal na economia global",
    excerpt:
      "Instituições monetárias mantêm mais de 35 mil toneladas do metal em reservas oficiais enquanto cenário geopolítico reforça a busca por estabilidade.",
    date: "2026-03-10",
    dateLabel: "10 Mar 2026",
    category: "Ouro",
    href: "https://goldenbrasil.com.br/bancos-centrais-ampliam-reservas-de-ouro-e-reforcam-papel-do-metal-na-economia-global/",
  },
  {
    title: "Como funciona o mercado global do ouro",
    excerpt:
      "Metal precioso movimenta trilhões de dólares por ano e continua sendo referência em segurança patrimonial e reservas internacionais.",
    date: "2026-03-06",
    dateLabel: "06 Mar 2026",
    category: "Ouro",
    href: "https://goldenbrasil.com.br/como-funciona-o-mercado-global-do-ouro/",
    image:
      "https://goldenbrasil.com.br/wp-content/uploads/2026/03/NOTICIA-0603-768x512.png",
  },
  {
    title:
      "Diamantes e certificação internacional: como funciona o mercado global de pedras preciosas",
    excerpt:
      "Avaliação técnica, padronização internacional e laudos especializados estruturam a negociação de diamantes no cenário mundial.",
    date: "2026-03-03",
    dateLabel: "03 Mar 2026",
    category: "Diamantes",
    href: "https://goldenbrasil.com.br/diamantes-e-certificacao-internacional-como-funciona-o-mercado-global-de-pedras-preciosas/",
    image:
      "https://goldenbrasil.com.br/wp-content/uploads/2026/03/1-768x512.png",
  },
  {
    title:
      "Segurança jurídica no setor mineral: por que contratos bem estruturados são essenciais",
    excerpt:
      "Em um segmento altamente regulado, formalização contratual garante previsibilidade, organização e proteção nas relações comerciais ligadas à atividade mineral.",
    date: "2026-02-27",
    dateLabel: "27 Fev 2026",
    category: "Segurança Jurídica",
    href: "https://goldenbrasil.com.br/seguranca-juridica-no-setor-mineral-por-que-contratos-bem-estruturados-sao-essenciais/",
    image:
      "https://goldenbrasil.com.br/wp-content/uploads/2026/02/Design-sem-nome-21-768x512.png",
  },
];

const categories = Array.from(new Set(posts.map((p) => p.category)));
const featured = posts.find((p) => p.featured) ?? posts[0];
const rest = posts.filter((p) => p !== featured);

function FrameMark() {
  // Decorative placeholder when post has no image
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a1408]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(240,208,96,0.22)_0%,transparent_55%),radial-gradient(ellipse_at_70%_80%,rgba(139,105,20,0.35)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-2xl italic text-[color:var(--color-gold-200)]">
        GB
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="relative bg-[color:var(--color-bg)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-[18vh] pb-[8vh] md:pt-[22vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
            <RevealOnScroll className="md:col-span-7">
              <div className="mb-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-800)]">
                <span className="block h-px w-12 bg-[color:var(--color-gold-800)]" />
                Blog
              </div>
              <h1 className="font-display text-[10vw] font-medium leading-[0.95] tracking-tight md:text-[5.5vw]">
                Análises e bastidores do{" "}
                <span className="text-gold-gradient italic">mercado mineral</span>.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll className="md:col-span-5" delay={0.15}>
              <p className="text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] md:text-lg">
                Conteúdo da Holding Golden Brasil sobre ouro, diamantes, joias,
                mineração e segurança jurídica no setor de ativos reais.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[color:var(--color-gold-800)]/30 bg-[color:var(--color-gold-800)]/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-gold-800)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="relative py-[6vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <RevealOnScroll>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition-colors duration-500 hover:border-[color:var(--color-gold-800)]/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch">
                <div className="relative aspect-[16/10] overflow-hidden md:col-span-7 md:aspect-auto">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="eager"
                    />
                  ) : (
                    <FrameMark />
                  )}
                  <span className="absolute left-6 top-6 rounded-full bg-[#f3eee2]/95 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-900)]">
                    Em destaque
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-6 p-8 md:col-span-5 md:p-12">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                    <span>{featured.category}</span>
                    <span className="block h-px w-8 bg-[color:var(--color-gold-800)]/40" />
                    <span className="text-[color:var(--color-ink-muted)]">
                      {featured.dateLabel}
                    </span>
                  </div>
                  <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                    <span>Ler matéria</span>
                    <span className="inline-block h-px w-12 bg-[color:var(--color-gold-800)] transition-all duration-500 group-hover:w-24" />
                  </div>
                </div>
              </div>
            </a>
          </RevealOnScroll>
        </div>
      </section>

      {/* GRID DE POSTS */}
      <section className="relative py-[8vh]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <RevealOnScroll
                key={post.href}
                delay={(i % 3) * 0.08}
                className="h-full"
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition-colors duration-500 hover:border-[color:var(--color-gold-800)]/50"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <FrameMark />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                      <span>{post.category}</span>
                      <span className="block h-px w-6 bg-[color:var(--color-gold-800)]/40" />
                      <span className="text-[color:var(--color-ink-muted)]">
                        {post.dateLabel}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-medium leading-snug md:text-2xl">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-4 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-gold-800)]">
                      <span>Ler matéria</span>
                      <span className="inline-block h-px w-8 bg-[color:var(--color-gold-800)] transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-[color:var(--color-border)]/50 bg-[color:var(--color-bg-deeper)] py-[14vh]">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <RevealOnScroll>
            <h2 className="font-display text-[9vw] font-medium leading-[0.92] tracking-tight md:text-[4.5vw]">
              Quer conversar sobre o <span className="text-gold-gradient italic">mercado real</span>?
            </h2>
            <p className="mt-8 max-w-2xl text-balance text-base text-[color:var(--color-ink-muted)] md:mx-auto md:text-lg">
              Fale com um consultor da Golden Brasil. Entenda como ouro,
              diamantes e contratos minerais podem fazer parte do seu
              patrimônio.
            </p>
            <div className="mt-12">
              <MagneticButton
                href="https://wa.link/2ukykr"
                className="rounded-full border border-[color:var(--color-gold-800)] bg-[color:var(--color-gold-800)] px-8 py-5 text-[12px] uppercase tracking-[0.25em] text-[#f3eee2] transition-colors duration-500 hover:bg-[color:var(--color-gold-900)]"
              >
                Falar com um consultor
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
