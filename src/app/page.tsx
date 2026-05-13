import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Sobre } from "@/components/sections/Sobre";
import { Servicos } from "@/components/sections/Servicos";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Numeros } from "@/components/sections/Numeros";
import { Sede } from "@/components/sections/Sede";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <Sobre />
      <Servicos />
      <Diferenciais />
      <Numeros />
      <Sede />
      <Cta />
    </main>
  );
}
