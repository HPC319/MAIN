"use client";

import { motion, Variants } from "@/lib/motion-kernel";

import { ReactNode, useEffect, useState } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  variant?: Variants | undefined;
  className?: string | undefined;
  delay?: number | undefined;
}

export const MotionWrapper = ({
  children,
  variant,
  className = "",
  delay = 0,
}: MotionWrapperProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Apply animation with variant
  const motionProps = variant
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-100px" },
        variants: variant,
        transition: { delay },
        className,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-100px" },
        transition: { delay },
        className,
      };

  return <motion.div {...motionProps}>{children}</motion.div>;
};
