"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** wrap a specific substring with this className (gold accent etc) */
  accent?: { match: string; className?: string };
};

/**
 * Splits text into chars, animates them from yPercent: 110 → 0 with stagger.
 * Mask is applied at the SEGMENT level (not per char), so italic glyph slants
 * are not clipped by neighboring char boxes.
 */
export function CharReveal({
  text,
  className,
  start = "top 85%",
  delay = 0,
  stagger = 0.02,
  duration = 1,
  accent,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    gsap.set(chars, { yPercent: 110 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "expo.out",
        });
      },
    });
    return () => {
      trigger.kill();
    };
  }, [start, delay, stagger, duration]);

  const segments = (() => {
    if (!accent || !text.includes(accent.match)) {
      return [{ text, accent: false }];
    }
    const idx = text.indexOf(accent.match);
    return [
      { text: text.slice(0, idx), accent: false },
      { text: accent.match, accent: true },
      { text: text.slice(idx + accent.match.length), accent: false },
    ].filter((s) => s.text.length > 0);
  })();

  return (
    <span ref={ref} className={cn("inline", className)}>
      {segments.map((seg, i) => (
        <span
          key={i}
          // overflow mask at segment level — italic slants stay inside the wrapper
          className={cn(
            "inline-block overflow-hidden align-bottom leading-[1.1]",
            "[padding-block:0.05em]",
            seg.accent && accent?.className,
          )}
        >
          {Array.from(seg.text).map((ch, j) => (
            <span
              key={j}
              data-char
              aria-hidden
              className="inline-block will-change-transform"
              style={{ whiteSpace: "pre" }}
            >
              {ch}
            </span>
          ))}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
