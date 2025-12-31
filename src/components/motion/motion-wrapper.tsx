// @ts-nocheck
"use client";

import { motion, Variants } from "@/lib/motion-kernel";

import { ReactNode, useEffect, useState } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  variant?: Variants;
  className?: string;
  delay?: number;
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
