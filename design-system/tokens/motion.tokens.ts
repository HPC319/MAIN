/**
 * Motion Tokens - CanonStrata Foundation
 * Single source of truth for all motion timing and easing
 */

export const motionTokens = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 400,
    slower: 600,
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    linear: 'linear',
  },
  transition: {
    fade: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    slide: {
      duration: 400,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    },
    scale: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    expand: {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
  },
  animation: {
    fadeIn: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      keyframes: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    fadeOut: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      keyframes: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    },
    slideUp: {
      duration: 400,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      keyframes: {
        from: { transform: 'translateY(16px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    slideDown: {
      duration: 400,
      easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      keyframes: {
        from: { transform: 'translateY(-16px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    scaleIn: {
      duration: 250,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      keyframes: {
        from: { transform: 'scale(0.95)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
      },
    },
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
export type MotionEasing = keyof typeof motionTokens.easing;
export type MotionTransition = keyof typeof motionTokens.transition;
export type MotionAnimation = keyof typeof motionTokens.animation;
