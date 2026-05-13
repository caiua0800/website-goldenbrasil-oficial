"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const updateProgress = () => {
      if (cancelled || !video.duration) return;
      const buffered =
        video.buffered.length > 0
          ? video.buffered.end(video.buffered.length - 1)
          : 0;
      const p = Math.min(100, Math.round((buffered / video.duration) * 100));
      setProgress(p);
      if (p >= 99) {
        setVideoReady(true);
      }
    };

    const onCanPlay = () => {
      if (cancelled) return;
      // Even before fully buffered, allow start
      if (video.readyState >= 3) setVideoReady(true);
      updateProgress();
    };

    const onProgress = () => updateProgress();
    const onLoadedData = () => {
      updateProgress();
      // Pre-warm: seek to last frame and back to force decoder to be ready
      try {
        video.currentTime = 0.01;
      } catch {}
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("progress", onProgress);

    // Force a metadata load if not yet
    if (video.readyState >= 1) updateProgress();

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("progress", onProgress);
    };
  }, []);

  useEffect(() => {
    if (!videoReady) return;
    registerGsap();
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const ctx = gsap.context(() => {
      // Cinematic intro
      gsap.set(eyebrowRef.current, { y: 30, opacity: 0 });
      const words =
        headlineRef.current?.querySelectorAll<HTMLElement>("[data-w]") ?? [];
      gsap.set(words, { yPercent: 110 });
      gsap.set(subRef.current, { y: 20, opacity: 0 });
      gsap.set(scrollCueRef.current, { opacity: 0, y: 10 });

      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.15,
      });
      intro
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.9 }, 0)
        .to(words, { yPercent: 0, duration: 1.2, stagger: 0.06 }, 0.1)
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.9 }, 0.6)
        .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.0);

      // Scroll-driven video scrubbing — every frame is a keyframe so this is silky
      const scrubObj = { t: 0 };
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const target = self.progress * video.duration;
          gsap.to(scrubObj, {
            t: target,
            duration: 0.12,
            overwrite: true,
            ease: "none",
            onUpdate: () => {
              try {
                video.currentTime = scrubObj.t;
              } catch {
                // ignore
              }
            },
          });
        },
      });

      // Title fades out as user scrolls (top text rises, subtitle drops)
      gsap.to(titleWrapRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
      gsap.to(subRef.current, {
        opacity: 0,
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // Final overlay text
      gsap.fromTo(
        finalRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "expo.out",
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "75% bottom",
            end: "95% bottom",
            scrub: 0.6,
          },
        },
      );

      gsap.to(scrollCueRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, [videoReady]);

  const headlineWords = ["Patrimônio", "em", "Ativos", "Reais."];

  return (
    <section
      id="top"
      ref={sectionRef}
      data-theme="light"
      className="relative h-[320vh] bg-[#f3eee2]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#f3eee2]">
        {/* Background video — all-keyframes MP4 for smooth scrubbing */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.8s var(--ease-out-expo)",
          }}
          aria-hidden
        />

        {/* Atmospheric framing — darker cream shelves top + bottom for text legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[38vh] bg-gradient-to-b from-[#e7dec9] via-[#e7dec9]/60 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28vh] bg-gradient-to-t from-[#e7dec9] via-[#e7dec9]/60 to-transparent"
        />
        {/* Warm vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(139,105,20,0.18)_100%)]" />

        {/* Loading state — until video is buffered enough */}
        {!videoReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#f3eee2]">
            <div className="font-display text-xs uppercase tracking-[0.5em] text-[color:var(--color-gold-800)]/70">
              Carregando
            </div>
            <div className="mt-6 h-px w-48 overflow-hidden bg-[color:var(--color-gold-800)]/15">
              <div
                className="h-full origin-left bg-gradient-to-r from-[color:var(--color-gold-800)] via-[color:var(--color-gold-500)] to-[color:var(--color-gold-800)] transition-transform duration-200 ease-out"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-gold-800)]/50">
              {String(progress).padStart(3, "0")}%
            </div>
          </div>
        )}

        {/* Title — top-aligned, frames the logo from above */}
        <div
          ref={titleWrapRef}
          className="pointer-events-none absolute inset-x-0 top-[10vh] z-20 flex w-full flex-col items-center px-6 text-center md:top-[12vh] md:px-10"
        >
          <div
            ref={eyebrowRef}
            className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.45em] text-[color:var(--color-gold-800)] md:text-[11px]"
            style={{ textShadow: "0 1px 0 rgba(231,222,201,0.7)" }}
          >
            <span className="h-px w-6 bg-[color:var(--color-gold-800)]/70 md:w-8" />
            Holding Golden Brasil — desde 2019
            <span className="h-px w-6 bg-[color:var(--color-gold-800)]/70 md:w-8" />
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-[10vw] font-medium leading-[0.92] tracking-tight text-[#0d0700] md:text-[6.5vw] lg:text-[5.5vw]"
            style={{ textShadow: "0 1px 1px rgba(231,222,201,0.6)" }}
          >
            {headlineWords.map((w, i) => (
              <span
                key={i}
                className="mx-[0.1em] inline-block overflow-hidden align-baseline"
              >
                <span
                  data-w
                  className={`inline-block will-change-transform ${
                    w === "Reais." ? "italic text-[color:var(--color-gold-800)]" : ""
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle — bottom of viewport, above scroll cue */}
        <p
          ref={subRef}
          className="pointer-events-none absolute inset-x-0 bottom-[22vh] z-20 mx-auto max-w-xl px-6 text-balance text-center text-sm leading-relaxed text-[#1a1408] md:bottom-[24vh] md:px-10 md:text-base"
          style={{ textShadow: "0 1px 0 rgba(231,222,201,0.7)" }}
        >
          Segurança e valorização patrimonial em ativos minerais auditados.
          Tecnologia contratual, lastro real, transparência total.
        </p>

        {/* Final overlay text */}
        <div
          ref={finalRef}
          className="pointer-events-none absolute inset-x-0 bottom-[16vh] z-10 px-6 text-center"
        >
          <p className="font-display text-xl italic text-[color:var(--color-gold-800)] md:text-2xl">
            “Democratizamos o acesso aos ativos mais valiosos do planeta.”
          </p>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-gold-800)]/60">
            Role para revelar
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[color:var(--color-gold-800)] to-transparent" />
        </div>

      </div>
    </section>
  );
}
