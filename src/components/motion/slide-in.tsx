/**
 * SlideIn Motion Component
 * 
 * Slide-in animation from various directions with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/hooks/use-media-query'

type Direction = 'top' | 'bottom' | 'left' | 'right'

const createSlideVariants = (direction: Direction, distance: number): Variants => {
  const directionMap = {
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }

  const offset = directionMap[direction]

  return {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }
}

export interface SlideInProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Direction to slide from
   * @default 'bottom'
   */
  direction?: Direction
  
  /**
   * Distance to slide in pixels
   * @default 20
   */
  distance?: number
  
  /**
   * Animation duration in seconds
   * @default 0.3
   */
  duration?: number
  
  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number
  
  /**
   * Custom easing function
   * @default 'easeOut'
   */
  easing?: string | number[]
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean
}

export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  (
    {
      children,
      direction = 'bottom',
      distance = 20,
      duration = 0.3,
      delay = 0,
      easing = 'easeOut',
      animateOnMount = true,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const variants = React.useMemo(
      () => createSlideVariants(direction, distance),
      [direction, distance]
    )

    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return <div ref={ref} {...props}>{children}</div>
    }

    return (
      <motion.div
        ref={ref}
        initial={animateOnMount ? 'hidden' : 'visible'}
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{
          duration,
          delay,
          ease: easing,
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

SlideIn.displayName = 'SlideIn'
