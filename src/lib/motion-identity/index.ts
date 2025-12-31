/**
 * CANONSTRATA SIGNATURE MOTION IDENTITY
 * 
 * Unique, recognizable animation patterns that define the Canonstrata brand.
 * Anyone can recognize a Canonstrata UI in motion alone.
 */

import { Variants } from '@/lib/motion-kernel';
import type { Transition, MotionProps } from 'framer-motion';
import { animationDuration, type AnimationDuration } from '../invariants';

// ============================================================================
// SIGNATURE EASING CURVES
// ============================================================================

/**
 * Canonstrata Spring - The signature elastic feel
 * More pronounced than standard springs
 */
export const canonstrataSpring = {
  type: 'spring' as const,
  damping: 18,
  stiffness: 150,
  mass: 0.8,
};

/**
 * Canonstrata Precision - Smooth but decisive
 * For interactions that need weight
 */
export const canostrataEase = [0.25, 0.1, 0.25, 1.0] as const;

/**
 * Canonstrata Snap - Quick and confident
 * For micro-interactions
 */
export const canostrataSnap = [0.4, 0.0, 0.2, 1.0] as const;

/**
 * Canonstrata Float - Gentle and organic
 * For ambient motion
 */
export const canostrataFloat = [0.33, 1, 0.68, 1] as const;

// ============================================================================
// SIGNATURE MOTION PATTERNS
// ============================================================================

/**
 * Canonstrata Reveal - Content slides up with scale
 * Signature entrance animation
 */
export const canostrataReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...canonstrataSpring,
      opacity: { duration: 0.3, ease: canostrataEase },
    },
  },
};

/**
 * Canonstrata Drawer - Smooth drawer motion with backdrop
 * Signature modal/drawer pattern
 */
export const canostrataDrawer: Variants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: canostrataSnap,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.4,
      ease: canostrataEase,
    },
  },
};

/**
 * Canonstrata Ripple - Expanding circle with fade
 * Signature interactive feedback
 */
export const canostrataRipple: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: canostrataFloat,
    },
  },
};

/**
 * Canonstrata Morph - Shape transformation with overshoot
 * Signature state change animation
 */
export const canoStrataMorph: Variants = {
  from: { scale: 1 },
  to: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.5,
      ease: canostrataEase,
      times: [0, 0.6, 1],
    },
  },
};

/**
 * Canonstrata Float - Gentle floating motion
 * Signature ambient animation for CTAs
 */
export const canostrataFloatAnimation: Variants = {
  float: {
    y: [-4, 4, -4],
    transition: {
      duration: 4,
      ease: canostrataFloat,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
};

/**
 * Canonstrata Stagger - Cascading reveal with elastic bounce
 * Signature list/grid animation
 */
export const canostrataStagger = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: canonstrataSpring,
    },
  },
} as const;

// ============================================================================
// SIGNATURE HOVER PATTERNS
// ============================================================================

/**
 * Canonstrata Lift - Elevate with shadow on hover
 * Signature card hover
 */
export const canostrataLift: MotionProps = {
  whileHover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: canostrataSnap,
    },
  },
  whileTap: {
    scale: 0.98,
    transition: {
      type: 'tween',
      duration: 0.1,
      ease: canostrataSnap,
    },
  },
};

/**
 * Canonstrata Glow - Expand with glow effect
 * Signature button hover
 */
export const canostrataGlow: MotionProps = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 200,
    },
  },
  whileTap: {
    scale: 0.95,
    transition: {
      type: 'tween',
      duration: 0.1,
      ease: canostrataSnap,
    },
  },
};

/**
 * Canonstrata Pulse - Subtle breathing effect
 * Signature attention grabber
 */
export const canoStrataPulse: Variants = {
  pulse: {
    scale: [1, 1.03, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: canostrataFloat,
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  },
};

// ============================================================================
// SIGNATURE LOADING PATTERNS
// ============================================================================

/**
 * Canonstrata Dots - Three dots with elastic bounce
 * Signature loading indicator
 */
export const canoStrataDots = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
        repeat: Infinity,
        repeatType: 'loop' as const,
        repeatDelay: 0.3,
      },
    },
  },
  dot: {
    initial: { y: 0 },
    animate: {
      y: [-12, 0],
      transition: {
        duration: 0.5,
        ease: canostrataEase,
      },
    },
  },
} as const;

/**
 * Canonstrata Spinner - Smooth rotation with scale pulse
 * Signature spinner
 */
export const canostrataSpinner: MotionProps = {
  animate: {
    rotate: 360,
    scale: [1, 1.1, 1],
    transition: {
      rotate: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
      scale: {
        duration: 1,
        ease: canostrataFloat,
        repeat: Infinity,
      },
    },
  },
};

// ============================================================================
// SIGNATURE TRANSITION PATTERNS
// ============================================================================

/**
 * Canonstrata Page - Full page transition
 * Signature route change animation
 */
export const canostrataPage: Variants = {
  initial: {
    opacity: 0,
    x: -20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: canostrataEase,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: canostrataSnap,
    },
  },
};

/**
 * Canonstrata Modal - Modal entrance with backdrop
 * Signature modal animation
 */
export const canostrataModal: Variants = {
  closed: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  open: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...canonstrataSpring,
      opacity: { duration: 0.2 },
    },
  },
};

/**
 * Canonstrata Backdrop - Backdrop fade
 */
export const canostrataBackdrop: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: canostrataSnap,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: canostrataEase,
    },
  },
};

// ============================================================================
// SIGNATURE SCROLL PATTERNS
// ============================================================================

/**
 * Canonstrata Parallax - Layered depth effect
 * Signature scroll animation
 */
export function canostrataParallax(depth: number) {
  return {
    initial: { y: 0 },
    whileInView: {
      y: [0, depth * -1],
      transition: {
        duration: 1.5,
        ease: canostrataFloat,
      },
    },
  };
}

/**
 * Canonstrata Fade In View - Content reveals on scroll
 */
export const canostrataFadeInView: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: canostrataEase,
    },
  },
};

// ============================================================================
// DURATION HELPERS
// ============================================================================

export const durations = {
  instant: animationDuration(100) as AnimationDuration,
  fast: animationDuration(200) as AnimationDuration,
  normal: animationDuration(300) as AnimationDuration,
  slow: animationDuration(400) as AnimationDuration,
  slower: animationDuration(600) as AnimationDuration,
} as const;

// ============================================================================
// MOTION PRESETS
// ============================================================================

/**
 * Apply signature motion to any component
 */
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

// ============================================================================
// EXPORTS
// All exports are done inline above - no duplicate exports needed

export type MotionPreset = keyof typeof canostrataMotion;
