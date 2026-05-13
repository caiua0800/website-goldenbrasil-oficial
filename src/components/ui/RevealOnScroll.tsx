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
  once?: boolean;
};

export function RevealOnScroll({
  children,
  as,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  start = "top 85%",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y, opacity: 0 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
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
  }, [delay, y, duration, start, once]);

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
