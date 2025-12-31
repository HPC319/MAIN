/**
 * FadeIn Motion Component
 * 
 * Fade-in animation with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type Variants } from '@/lib/motion-kernel'
import type { Easing } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/hooks/use-media-query'

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

export interface FadeInProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode
  /**
   * Animation duration in seconds
   * @default 0.3
   */
  duration?: number | undefined
  
  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number | undefined
  
  /**
   * Custom easing function
   * @default 'easeOut'
   */
  easing?: Easing | Easing[] | undefined
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean | undefined
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
      return <div ref={ref} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>
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
        {...(props as unknown as React.ComponentProps<typeof motion.div>)}
      >
        {children as React.ReactNode}
      </motion.div>
    )
  }
)

FadeIn.displayName = 'FadeIn'
