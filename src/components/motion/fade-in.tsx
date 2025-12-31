/**
 * FadeIn Motion Component
 * 
 * Fade-in animation with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Variants, type Easing } from '@/lib/motion-kernel'
import { usePrefersReducedMotion } from '@/lib/hooks/use-media-query'

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Animation duration in seconds
   * @default 0.3
   */
  duration?: number
  
  /**
   * Animation delay in seconds
   * @default 0\
   */
  delay?: number
  
  /**
   * Custom easing function
   * @default 'easeOut'
   */
  easing?: Easing | Easing[]
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean
}

export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      children,
      duration = 0.3,
      delay = 0,
      easing = 'easeOut',
      animateOnMount = true,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return <div ref={ref} {...props}>{children as React.ReactNode}</div>
    }

    return (
      <motion.div
        ref={ref}
        initial={animateOnMount ? 'hidden' : 'visible'}
        animate="visible"
        exit="hidden"
        variants={fadeInVariants}
        transition={{
          duration,
          delay,
          ease: easing,
        }}
        {...props}
      >
        {children as React.ReactNode}
      </motion.div>
    )
  }
)

FadeIn.displayName = 'FadeIn'
