"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
};

function formatNumber(value: number, decimals: number, separator: string) {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart ? `${grouped},${decPart}` : grouped;
}

export function Counter({
  to,
  duration = 2.2,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ".",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const obj = { v: 0 };
    el.textContent = `${prefix}${formatNumber(0, decimals, separator)}${suffix}`;

    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power3.out",
      paused: true,
      onUpdate: () => {
        el.textContent = `${prefix}${formatNumber(obj.v, decimals, separator)}${suffix}`;
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [to, duration, prefix, suffix, decimals, separator]);

  return <span ref={ref} className={className} />;
}
