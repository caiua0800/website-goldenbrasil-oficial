"use client";

import { useEffect, useState } from "react";

type Props = {
  count?: number;
  className?: string;
};

type P = {
  i: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

export function Particles({ count = 22, className }: Props) {
  // Generate ONLY on client after mount to avoid hydration mismatch.
  const [particles, setParticles] = useState<P[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {particles.map((p) => (
        <span
          key={p.i}
          className="absolute rounded-full bg-[color:var(--color-gold-200)] blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 4}px rgba(240,208,96,0.6)`,
            animation: `particle-drift-${p.i} ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      {particles.length > 0 && (
        <style>{particles
          .map(
            (p) => `
@keyframes particle-drift-${p.i} {
  0%   { transform: translate3d(0,0,0); opacity: ${p.opacity * 0.3}; }
  50%  { transform: translate3d(${p.drift / 2}px, ${-p.drift}px, 0); opacity: ${p.opacity}; }
  100% { transform: translate3d(${p.drift}px, ${-p.drift * 1.5}px, 0); opacity: ${p.opacity * 0.4}; }
}`,
          )
          .join("\n")}</style>
      )}
    </div>
  );
}
