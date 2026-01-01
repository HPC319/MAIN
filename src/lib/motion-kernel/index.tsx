/**
 * MOTION KERNEL
 * 
 * Constitutional motion system - the ONLY source of animation in the app.
 * 
 * LAWS:
 * - Intent-based API (12 approved intents only)
 * - No framer-motion imports outside this file
 * - useReducedMotion enforced globally
 * - Zero inline motion configs elsewhere
 * 
 * APPROVED INTENTS:
 * - ENTRY_SOFT: Gentle fade + slide entrance
 * - EXIT_HARD: Quick exit
 * - DRAWER: Side panel slide
 * - RIPPLE: Click feedback
 * - HOVER_SHAPE: Geometric hover transforms
 * - FLOAT: Subtle floating motion
 * - GRID_ENTRY: Staggered grid item entrance
 * - HOVER_CARD: Card elevation on hover
 * - HOVER_BUTTON: Button scale on hover
 * - PULSE: Attention-seeking pulse
 * - INFINITE_LOOP: Continuous rotation/float
 * - REDUCED: Respects prefers-reduced-motion
 */

'use client';

import { motion, HTMLMotionProps, MotionStyle } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { forwardRef } from 'react';

export type MotionIntent =
  | 'ENTRY_SOFT'
  | 'EXIT_HARD'
  | 'DRAWER'
  | 'RIPPLE'
  | 'HOVER_SHAPE'
  | 'FLOAT'
  | 'GRID_ENTRY'
  | 'HOVER_CARD'
  | 'HOVER_BUTTON'
  | 'PULSE'
  | 'INFINITE_LOOP'
  | 'REDUCED';

/**
 * Motion configuration for each intent
 */
const getMotionConfig = (intent: MotionIntent, prefersReduced: boolean, delay = 0) => {
  if (prefersReduced || intent === 'REDUCED') {
    return {
      initial: {},
      animate: {},
      exit: {},
      transition: { duration: 0 },
    };
  }

  switch (intent) {
    case 'ENTRY_SOFT':
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.4, delay },
      };

    case 'EXIT_HARD':
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.2 },
      };

    case 'DRAWER':
      return {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      };

    case 'RIPPLE':
      return {
        initial: { scale: 0, opacity: 0.8 },
        animate: { scale: 2, opacity: 0 },
        exit: {},
        transition: { duration: 0.6 },
      };

    case 'HOVER_SHAPE':
      return {
        initial: {},
        whileHover: { scale: 1.05, rotate: 2 },
        transition: { duration: 0.2 },
      };

    case 'FLOAT':
      return {
        initial: {},
        animate: { y: [-5, 5, -5] },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

    case 'GRID_ENTRY':
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.3, delay },
      };

    case 'HOVER_CARD':
      return {
        initial: {},
        whileHover: { y: -8, scale: 1.02 },
        transition: { duration: 0.2 },
      };

    case 'HOVER_BUTTON':
      return {
        initial: {},
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        transition: { duration: 0.15 },
      };

    case 'PULSE':
      return {
        initial: {},
        animate: { scale: [1, 1.1, 1] },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

    case 'INFINITE_LOOP':
      return {
        initial: {},
        animate: { rotate: 360 },
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        },
      };

    default:
      return {
        initial: {},
        animate: {},
        exit: {},
        transition: {},
      };
  }
};

/**
 * Base props for all motion components
 */
export interface MotionBlockProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  intent: MotionIntent;
  delay?: number;
}

/**
 * MotionBlock - Animated div container
 */
export const MotionBlock = forwardRef<HTMLDivElement, MotionBlockProps>(
  ({ intent, delay = 0, style, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const config = getMotionConfig(intent, prefersReduced, delay);

    return (
      <motion.div
        ref={ref}
        {...config}
        {...props}
        style={style as MotionStyle}
      />
    );
  }
);
MotionBlock.displayName = 'MotionBlock';

/**
 * MotionText - Animated span for text
 */
export const MotionText = forwardRef<HTMLSpanElement, Omit<HTMLMotionProps<'span'>, 'ref'> & { intent: MotionIntent; delay?: number }>(
  ({ intent, delay = 0, style, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const config = getMotionConfig(intent, prefersReduced, delay);

    return (
      <motion.span
        ref={ref}
        {...config}
        {...props}
        style={style as MotionStyle}
      />
    );
  }
);
MotionText.displayName = 'MotionText';

/**
 * MotionImage - Animated img
 */
export const MotionImage = forwardRef<HTMLImageElement, Omit<HTMLMotionProps<'img'>, 'ref'> & { intent: MotionIntent; delay?: number }>(
  ({ intent, delay = 0, style, ...props }, ref) => {
    const prefersReduced = useReducedMotion();
    const config = getMotionConfig(intent, prefersReduced, delay);

    return (
      <motion.img
        ref={ref}
        {...config}
        {...props}
        style={style as MotionStyle}
      />
    );
  }
);
MotionImage.displayName = 'MotionImage';
