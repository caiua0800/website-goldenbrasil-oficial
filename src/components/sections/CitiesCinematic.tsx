"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

type City = {
  img: string;
  name: string;
  tag: string;
  desc: string;
  state: string;
};

type Props = {
  cities: City[];
};

/**
 * Cinematic pinned section. The container is N×100vh tall. As user scrolls
 * through it, the section pins and the foreground/background crossfade
 * through the city panels — like an Apple product reveal.
 */
export function CitiesCinematic({ cities }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imgs = section.querySelectorAll<HTMLElement>("[data-img]");
      const panels = section.querySelectorAll<HTMLElement>("[data-panel]");
      const dots = section.querySelectorAll<HTMLElement>("[data-dot]");
      const progressBar = section.querySelector<HTMLElement>("[data-progress]");

      // Initial state: only first image + first panel visible
      imgs.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 });
      });
      panels.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
      });
      dots.forEach((el, i) => {
        el.dataset.active = i === 0 ? "true" : "false";
      });

      // Build the master timeline driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: "[data-stage]",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.transform = `scaleY(${self.progress})`;
            }
            // Update dot states based on which phase we're in
            const phase = Math.min(
              cities.length - 1,
              Math.floor(self.progress * cities.length),
            );
            dots.forEach((d, i) => {
              d.dataset.active = i === phase ? "true" : "false";
            });
          },
        },
      });

      // For N cities, we crossfade between them across the timeline.
      // Each segment occupies 1/N of the total. The transition zone is small (20% overlap).
      for (let i = 0; i < cities.length - 1; i++) {
        const segmentStart = i / (cities.length - 1);
        const segmentEnd = (i + 1) / (cities.length - 1);
        const midPoint = (segmentStart + segmentEnd) / 2;

        // Crossfade image i out, image i+1 in
        tl.to(
          imgs[i],
          { opacity: 0, scale: 1.05, ease: "power2.inOut" },
          midPoint,
        );
        tl.fromTo(
          imgs[i + 1],
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, ease: "power2.inOut" },
          midPoint,
        );

        // Crossfade text panel i out, panel i+1 in
        tl.to(
          panels[i],
          { opacity: 0, y: -30, ease: "power2.inOut" },
          midPoint,
        );
        tl.fromTo(
          panels[i + 1],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.inOut" },
          midPoint,
        );
      }
    }, section);

    return () => ctx.revert();
  }, [cities]);

  // Section height = 100vh × N (one screen per city for pacing)
  const height = `${cities.length * 100}vh`;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[color:var(--color-border)]/50 bg-black"
      style={{ height }}
    >
      <div
        data-stage
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Stacked background images */}
        {cities.map((c, i) => (
          <div
            key={c.name}
            data-img
            className="absolute inset-0 will-change-transform"
            aria-hidden={i > 0}
          >
            <img
              src={c.img}
              alt={c.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Cinematic vignette + bottom gradient for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

        {/* Section header — always visible */}
        <div className="absolute inset-x-0 top-0 z-10 pt-[14vh] md:pt-[16vh]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-gold-200)]">
              <span>03</span>
              <span className="block h-px w-16 bg-[color:var(--color-gold-200)]/60" />
              <span>Presença</span>
            </div>
            <h2 className="max-w-3xl font-display text-[7vw] font-medium leading-[0.95] tracking-tight text-[#f3eee2] md:text-[3.8vw]">
              Onde a{" "}
              <span className="text-gold-gradient italic">estratégia</span>{" "}
              acontece.
            </h2>
          </div>
        </div>

        {/* Stacked text panels (one per city, crossfading) */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-[10vh] md:pb-[14vh]">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="relative h-[36vh] md:h-[30vh]">
              {cities.map((c, i) => (
                <div
                  key={c.name}
                  data-panel
                  className="absolute inset-x-0 bottom-0 will-change-transform"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end md:gap-12">
                    <div className="md:col-span-7">
                      <div className="mb-3 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-200)]">
                        <span className="block h-px w-8 bg-[color:var(--color-gold-200)]" />
                        {c.tag} · {c.state}
                      </div>
                      <h3 className="font-display text-[9vw] font-medium leading-[0.95] tracking-tight text-[#f3eee2] md:text-[5.5vw]">
                        {c.name}
                      </h3>
                    </div>
                    <p className="md:col-span-5 max-w-md text-balance text-base leading-relaxed text-[#d4cebf] md:text-lg">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side progress indicator */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:right-10 md:flex">
          {/* Track */}
          <div className="relative h-48 w-px overflow-hidden bg-[#f3eee2]/15">
            <div
              data-progress
              className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-gradient-to-b from-[color:var(--color-gold-200)] via-[color:var(--color-gold-200)] to-[color:var(--color-gold-200)]/40"
            />
          </div>
          {/* Dots */}
          <div className="flex flex-col gap-3">
            {cities.map((c, i) => (
              <div
                key={c.name}
                data-dot
                data-active={i === 0 ? "true" : "false"}
                className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-[#f3eee2]/40 transition-colors duration-500 data-[active=true]:text-[color:var(--color-gold-200)]"
              >
                <span className="h-px w-4 bg-current transition-all duration-500 data-[active=true]:w-8" />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
