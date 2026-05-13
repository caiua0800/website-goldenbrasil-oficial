"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Container className (controls aspect/size) */
  className?: string;
  /** Image className overrides */
  imgClassName?: string;
  /** How many pixels of parallax. Positive = image moves slower than scroll (looks like depth). */
  amount?: number;
  /** Apply a clip-path reveal from bottom→top on first enter */
  reveal?: boolean;
  /** Image loading */
  loading?: "eager" | "lazy";
};

/**
 * Wraps an <img> in a container that translates its inner element on scroll.
 * Combined with overflow-hidden on container = parallax depth.
 *
 * When reveal=true, the image starts hidden behind a bottom clip-path that
 * animates up on first viewport enter (cinematic curtain).
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  amount = 80,
  reveal = false,
  loading = "lazy",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsap();
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const ctx = gsap.context(() => {
      // Parallax: inner translates from +amount to -amount as section moves through viewport
      gsap.fromTo(
        inner,
        { yPercent: 0 },
        {
          yPercent: -amount / 5, // smaller percentage feels natural
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      if (reveal) {
        gsap.fromTo(
          container,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, container);

    return () => ctx.revert();
  }, [amount, reveal]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          loading={loading}
        />
      </div>
    </div>
  );
}
