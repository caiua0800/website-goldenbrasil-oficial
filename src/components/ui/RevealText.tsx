"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  stagger?: number;
  splitByWord?: boolean;
};

export function RevealText({
  children,
  as,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  start = "top 85%",
  stagger = 0.06,
  splitByWord = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    if (splitByWord && typeof children === "string") {
      const words = children.split(" ");
      el.innerHTML = words
        .map(
          (w) =>
            `<span class="inline-block overflow-hidden"><span data-w class="inline-block will-change-transform">${w}</span></span>`,
        )
        .join(" ");

      const items = el.querySelectorAll<HTMLElement>("[data-w]");
      gsap.set(items, { yPercent: 110 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(items, {
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
    }

    gsap.set(el, { y, opacity: 0 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "expo.out",
        });
      },
    });
    return () => {
      trigger.kill();
    };
  }, [children, delay, y, duration, start, stagger, splitByWord]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {!splitByWord ? children : null}
    </Tag>
  );
}
