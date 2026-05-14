import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { Cursor } from "@/components/ui/Cursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goldenbrasil.com.br"),
  title: {
    default: "Golden Brasil — Segurança e Valorização Patrimonial em Ativos Reais",
    template: "%s · Golden Brasil",
  },
  description:
    "Holding referência nacional em ativos minerais desde 2019. Democratizamos o acesso aos ativos mais valiosos do planeta através de tecnologia, transparência e lastro real.",
  keywords: [
    "Golden Brasil",
    "CPOM",
    "ativos minerais",
    "patrimônio",
    "diamantes certificados",
    "mineração",
    "lastro real",
  ],
  openGraph: {
    title: "Golden Brasil — Patrimônio em Ativos Reais",
    description:
      "Segurança e valorização patrimonial em ativos minerais. R$ 490M+ em valuation, R$ 1,2B em balanço, 98% de renovação de contratos.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="bg-[color:var(--color-bg)] text-[color:var(--color-ink)] custom-cursor-active">
        <SmoothScrollProvider>
          <Nav />
          <PageTransition>
            {children}
            <Footer />
          </PageTransition>
        </SmoothScrollProvider>
        <Cursor />
        <GrainOverlay />
      </body>
    </html>
  );
}
