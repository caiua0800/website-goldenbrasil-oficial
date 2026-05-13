"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { CharReveal } from "@/components/ui/CharReveal";

/**
 * /quem-somos hero — full-bleed gold-bar video (download.mp4) playing in a
 * loop, cinematic magazine-style text overlay, scroll-driven parallax + exit.
 */
export function QuemSomosHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textLeftRef = useRef<HTMLDivElement | null>(null);
  const textRightRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);

  const [videoReady, setVideoReady] = useState(false);

  // Ping-pong playback: manual currentTime control via rAF, flipping
  // direction at endpoints (HTML5 video doesn't support negative playbackRate
  // on Chrome/Firefox, so we drive the playhead ourselves).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let raf = 0;
    let last = performance.now();
    let dir: 1 | -1 = 1;
    const speed = 1.0; // 1.0 = natural playback speed
    const epsilon = 0.04; // small offset from endpoints to avoid sticky seeks

    const ready = () => {
      setVideoReady(true);
      try {
        v.pause();
        v.currentTime = epsilon;
      } catch {}
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const duration = v.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      let t = v.currentTime + dir * dt * speed;
      if (t >= duration - epsilon) {
        t = duration - epsilon;
        dir = -1;
      } else if (t <= epsilon) {
        t = epsilon;
        dir = 1;
      }
      try {
        v.currentTime = t;
      } catch {}
      raf = requestAnimationFrame(tick);
    };

    if (v.readyState >= 2) ready();
    else v.addEventListener("loadeddata", ready, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", ready);
    };
  }, []);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Intro reveal
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(textRightRef.current, { opacity: 0, y: 30 });
      gsap.set(cueRef.current, { opacity: 0, y: 10 });

      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2,
      });
      intro
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0)
        .to(textRightRef.current, { opacity: 1, y: 0, duration: 1.1 }, 0.5)
        .to(cueRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0);

      // Video parallax — moves down slower than scroll + slight zoom out
      gsap.to(videoWrapRef.current, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Text exits: left moves up faster + fades
      gsap.to(textLeftRef.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "70% top",
          scrub: 0.5,
        },
      });

      gsap.to(textRightRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: 0.5,
        },
      });

      // Bottom curtain — cream gradient rises to transition out of hero
      gsap.to(curtainRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "60% bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Scroll cue bobs
      gsap.to(cueRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[110vh] overflow-hidden bg-[color:var(--color-bg)]"
    >
      {/* VIDEO BG — gold bar in cream space */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        <video
          ref={videoRef}
          src="/download.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "70% center",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.9s var(--ease-out-expo)",
          }}
        />
      </div>

      {/* Cream radial vignette to bleed video into page bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_center,transparent_15%,rgba(243,238,226,0.55)_80%,rgba(243,238,226,0.9)_100%)]" />

      {/* Left text legibility wash */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#f3eee2]/85 via-[#f3eee2]/55 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-[10vh] pt-[18vh] md:px-10 md:pb-[14vh] md:pt-[20vh]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end md:gap-16">
          {/* LEFT — eyebrow + massive headline */}
          <div ref={textLeftRef} className="md:col-span-8">
            <div
              ref={eyebrowRef}
              className="mb-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-800)]"
            >
              <span className="block h-px w-12 bg-[color:var(--color-gold-800)]" />
              Nossa Herança
            </div>

            <h1 className="font-display text-[12vw] font-medium leading-[0.9] tracking-tight text-[#0d0700] md:text-[7vw]">
              <span className="block">
                <CharReveal text="Referência" />
              </span>
              <span className="block">
                <CharReveal
                  text="no mercado de"
                  stagger={0.022}
                  delay={0.15}
                />
              </span>
              <span className="block">
                <CharReveal
                  text="minérios"
                  accent={{
                    match: "minérios",
                    className: "text-[color:var(--color-gold-800)] italic",
                  }}
                  stagger={0.022}
                  delay={0.3}
                />{" "}
                <CharReveal
                  text="e"
                  stagger={0.04}
                  delay={0.42}
                />{" "}
                <CharReveal
                  text="pedras preciosas"
                  accent={{
                    match: "pedras preciosas",
                    className: "text-[color:var(--color-gold-800)] italic",
                  }}
                  stagger={0.022}
                  delay={0.48}
                />
              </span>
              <span className="block">
                <CharReveal
                  text="desde 2019."
                  stagger={0.03}
                  delay={0.78}
                />
              </span>
            </h1>
          </div>

          {/* RIGHT — short copy + quote */}
          <div ref={textRightRef} className="md:col-span-4">
            <div className="mb-8 h-px w-full bg-gradient-to-r from-[color:var(--color-gold-800)]/50 via-[color:var(--color-gold-800)]/20 to-transparent" />
            <p className="text-balance text-base leading-relaxed text-[#1a1408] md:text-lg">
              Grupo empresarial brasileiro que atua no setor de minérios e
              pedras preciosas, com foco em operações reais, ativos físicos
              e estrutura contratual privada.
            </p>
            <p className="mt-8 border-l-2 border-[color:var(--color-gold-800)] pl-5 font-display text-lg italic leading-snug text-[color:var(--color-gold-800)] md:text-xl">
              Transformando recursos em valores perpétuos para gerações
              futuras.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="absolute bottom-8 left-6 z-10 flex flex-col items-start gap-2 md:left-10"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]/70">
            Role para conhecer
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[color:var(--color-gold-800)] to-transparent" />
        </div>
      </div>

      {/* Bottom curtain — cream gradient reveals when hero exits */}
      <div
        ref={curtainRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[color:var(--color-bg)] via-[color:var(--color-bg)]/70 to-transparent opacity-0"
      />
    </section>
  );
}
