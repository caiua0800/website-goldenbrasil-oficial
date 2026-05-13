"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
  as,
  ariaLabel,
}: Props) {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      tx = x * strength;
      ty = y * strength;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      inner.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Element = (as ?? (href ? "a" : "button")) as "a" | "button";

  return (
    <Element
      ref={wrapperRef as never}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-center justify-center will-change-transform",
        className,
      )}
      data-cursor="hover"
    >
      <span ref={innerRef} className="block will-change-transform">
        {children}
      </span>
    </Element>
  );
}
