"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Pre-formed items to repeat. Will duplicate them for seamless loop. */
  children: ReactNode;
  className?: string;
  /** seconds per loop */
  duration?: number;
  /** reverse direction */
  reverse?: boolean;
  /** pause when user hovers */
  pauseOnHover?: boolean;
};

/**
 * Infinite horizontal marquee — pure CSS keyframe loop on a doubled track.
 * Perfect for value pills, partner logos, etc.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
  pauseOnHover = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // No JS animation — we use CSS keyframes on the track for performance.
  useEffect(() => {
    // No-op; left here in case we add JS-based pause/play later.
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group/marquee relative overflow-hidden",
        className,
      )}
      data-pause-on-hover={pauseOnHover ? "true" : "false"}
    >
      <div
        className={cn(
          "flex w-max gap-12 [animation:marquee-x_var(--marquee-duration)_linear_infinite]",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
        {children}
      </div>

      <style>{`
        @keyframes marquee-x {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
