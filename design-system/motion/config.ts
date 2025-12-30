/**
 * Motion Configuration
 * Centralized animation timing and easing definitions
 */

export const duration = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const easing = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const;

export const intensity = {
  subtle: {
    scale: 0.98,
    y: 8,
    opacity: 0.8,
  },
  moderate: {
    scale: 0.95,
    y: 16,
    opacity: 0.5,
  },
  bold: {
    scale: 0.9,
    y: 32,
    opacity: 0,
  },
} as const;

export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Intensity = keyof typeof intensity;
