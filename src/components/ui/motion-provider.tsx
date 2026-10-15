"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/** Loads only the animation features we use and respects prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
