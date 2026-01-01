/**
 * DEPRECATED: CANONSTRATA SIGNATURE MOTION IDENTITY
 * 
 * This file is deprecated in favor of Motion Kernel.
 * All motion should now go through @/lib/motion-kernel with intent-based API.
 * 
 * Migration path:
 * - canostrataReveal → MotionBlock intent="ENTRY_SOFT"
 * - canostrataDrawer → MotionBlock intent="DRAWER"
 * - canostrataRipple → MotionBlock intent="RIPPLE"
 * - canostrataLift → MotionBlock intent="HOVER_CARD"
 * - canostrataGlow → MotionBlock intent="HOVER_BUTTON"
 * - canoStrataPulse → MotionBlock intent="PULSE"
 * - canostrataFloatAnimation → MotionBlock intent="FLOAT"
 * - canostrataStagger → MotionBlock intent="GRID_ENTRY" with staggerChildren
 * 
 * DO NOT USE THIS FILE. Use Motion Kernel instead.
 */

// Type stub for backward compatibility
export type Variants = Record<string, any>;

// Deprecated exports - kept for type compatibility only
export const canonstrataSpring = {} as const;
export const canostrataEase = [0.25, 0.1, 0.25, 1.0] as const;
export const canostrataSnap = [0.4, 0.0, 0.2, 1.0] as const;
export const canostrataFloat = [0.33, 1, 0.68, 1] as const;

// All motion patterns deprecated - use Motion Kernel
export const canostrataReveal: Variants = {} as Variants;
export const canostrataDrawer: Variants = {} as Variants;
export const canostrataRipple: Variants = {} as Variants;
export const canoStrataMorph: Variants = {} as Variants;
export const canostrataFloatAnimation: Variants = {} as Variants;
export const canostrataStagger = {} as const;
export const canostrataLift = {} as const;
export const canostrataGlow = {} as const;
export const canoStrataPulse: Variants = {} as Variants;
export const canoStrataDots = {} as const;
export const canostrataSpinner = {} as const;
export const canostrataPage: Variants = {} as Variants;
export const canostrataModal: Variants = {} as Variants;
export const canostrataBackdrop: Variants = {} as Variants;
export const canostrataFadeInView: Variants = {} as Variants;

export function canostrataParallax(_depth: number) {
  console.warn('DEPRECATED: Use Motion Kernel instead');
  return {};
}

export const durations = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 400,
  slower: 600,
} as const;

export const canostrataMotion = {
  reveal: canostrataReveal,
  drawer: canostrataDrawer,
  ripple: canostrataRipple,
  morph: canoStrataMorph,
  float: canostrataFloatAnimation,
  stagger: canostrataStagger,
  lift: canostrataLift,
  glow: canostrataGlow,
  pulse: canoStrataPulse,
  dots: canoStrataDots,
  spinner: canostrataSpinner,
  page: canostrataPage,
  modal: canostrataModal,
  backdrop: canostrataBackdrop,
  fadeInView: canostrataFadeInView,
  parallax: canostrataParallax,
} as const;

export type MotionPreset = keyof typeof canostrataMotion;

// WARNING: This entire module is deprecated. Use @/lib/motion-kernel instead.
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  DEPRECATED: motion-identity is deprecated. Use Motion Kernel (@/lib/motion-kernel) instead.'
  );
}
