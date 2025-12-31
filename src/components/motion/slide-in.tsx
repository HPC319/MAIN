/**
 * SlideIn Motion Component
 * 
 * Slide-in animation from various directions with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Variants } from '@/lib/motion-kernel'
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
  direction?: Direction | undefined
  
  /**
   * Distance to slide in pixels
   * @default 20
   */
  distance?: number | undefined
  
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
  easing?: string | number[] | undefined
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean | undefined
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
      return <div ref={ref} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>
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
          ...(easing !== undefined ? { ease: (Array.isArray(easing) ? easing : (typeof easing === 'string' ? easing : [easing])) as import('framer-motion').Easing | import('framer-motion').Easing[] } : {}),
        }}
        {...(props as unknown as React.ComponentProps<typeof motion.div>)}
      >
        {children as React.ReactNode}
      </motion.div>
    )
  }
)

SlideIn.displayName = 'SlideIn'
