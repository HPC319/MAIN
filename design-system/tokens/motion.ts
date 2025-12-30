/**
 * Design System - Motion Tokens
 * 
 * Animation and transition tokens for consistent motion design
 * Following best practices for web animations and respecting user preferences
 */

/**
 * Duration tokens (in milliseconds and seconds)
 */
export const duration = {
  instant: {
    ms: 0,
    s: '0s',
  },
  fast: {
    ms: 150,
    s: '0.15s',
  },
  normal: {
    ms: 250,
    s: '0.25s',
  },
  moderate: {
    ms: 350,
    s: '0.35s',
  },
  slow: {
    ms: 500,
    s: '0.5s',
  },
  slower: {
    ms: 750,
    s: '0.75s',
  },
  slowest: {
    ms: 1000,
    s: '1s',
  },
} as const

/**
 * Easing functions (timing functions)
 */
export const easing = {
  // Standard easings
  linear: 'linear',
  
  // Ease variants
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Custom cubic-bezier curves
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Material Design standard
  snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',      // Quick response
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',  // Smooth and soft
  
  // Entrance animations
  entrance: 'cubic-bezier(0, 0, 0.2, 1)',      // Deceleration
  exit: 'cubic-bezier(0.4, 0, 1, 1)',          // Acceleration
  
  // Spring-like easings
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bounce effect
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Alias for spring
  
  // Sharp transitions
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  
  // Emphasized
  emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
} as const

/**
 * Delay tokens
 */
export const delay = {
  none: '0s',
  short: '0.1s',
  medium: '0.2s',
  long: '0.3s',
  longer: '0.5s',
} as const

/**
 * Common transition presets
 */
export const transition = {
  // Base transitions
  base: `all ${duration.normal.s} ${easing.smooth}`,
  fast: `all ${duration.fast.s} ${easing.smooth}`,
  slow: `all ${duration.slow.s} ${easing.smooth}`,
  
  // Property-specific transitions
  color: `color ${duration.normal.s} ${easing.smooth}`,
  background: `background-color ${duration.normal.s} ${easing.smooth}`,
  border: `border-color ${duration.normal.s} ${easing.smooth}`,
  opacity: `opacity ${duration.normal.s} ${easing.smooth}`,
  transform: `transform ${duration.normal.s} ${easing.smooth}`,
  
  // Interaction transitions
  hover: `all ${duration.fast.s} ${easing.smooth}`,
  focus: `all ${duration.fast.s} ${easing.smooth}`,
  active: `all ${duration.fast.s} ${easing.snappy}`,
  
  // Complex transitions
  fadeIn: `opacity ${duration.normal.s} ${easing.entrance}`,
  fadeOut: `opacity ${duration.normal.s} ${easing.exit}`,
  slideIn: `transform ${duration.normal.s} ${easing.entrance}`,
  slideOut: `transform ${duration.normal.s} ${easing.exit}`,
  scale: `transform ${duration.normal.s} ${easing.spring}`,
  
  // Modal/Dialog transitions
  modal: `opacity ${duration.normal.s} ${easing.smooth}, transform ${duration.normal.s} ${easing.smooth}`,
  dropdown: `opacity ${duration.fast.s} ${easing.entrance}, transform ${duration.fast.s} ${easing.entrance}`,
  tooltip: `opacity ${duration.fast.s} ${easing.smooth}`,
} as const

/**
 * Animation variants for Framer Motion
 */
export const animation = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.normal.ms / 1000 },
  },
  
  // Slide animations
  slideInFromTop: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: duration.normal.ms / 1000, ease: 'easeOut' },
  },
  
  slideInFromBottom: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: duration.normal.ms / 1000, ease: 'easeOut' },
  },
  
  slideInFromLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: duration.normal.ms / 1000, ease: 'easeOut' },
  },
  
  slideInFromRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: duration.normal.ms / 1000, ease: 'easeOut' },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: duration.normal.ms / 1000 },
  },
  
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: duration.normal.ms / 1000, ease: [0.68, -0.55, 0.265, 1.55] },
  },
  
  // Stagger animations (for containers)
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.normal.ms / 1000 },
  },
} as const

/**
 * Keyframe animations (for CSS animations)
 */
export const keyframes = {
  // Spin
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  
  // Pulse
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  
  // Bounce
  bounce: {
    '0%, 100%': { 
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
    },
    '50%': { 
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  
  // Ping
  ping: {
    '75%, 100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
  
  // Shake
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
  },
} as const

/**
 * Spring configurations for physics-based animations
 */
export const spring = {
  // Gentle spring
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  
  // Bouncy spring
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
    mass: 0.5,
  },
  
  // Snappy spring
  snappy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  },
  
  // Smooth spring
  smooth: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
    mass: 1,
  },
} as const

export type Duration = keyof typeof duration
export type Easing = keyof typeof easing
export type Transition = keyof typeof transition
export type Animation = keyof typeof animation
export type Spring = keyof typeof spring

/**
 * Helper function to get duration in milliseconds
 */
export function getDuration(token: Duration): number {
  return duration[token].ms
}

/**
 * Helper function to get transition string
 */
export function getTransition(token: Transition): string {
  return transition[token]
}

/**
 * Helper to check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
