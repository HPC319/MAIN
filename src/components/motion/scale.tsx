/**
 * Scale Motion Component
 * 
 * Scale animation with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Variants } from '@/lib/motion-kernel'
import { usePrefersReducedMotion } from '@/lib/hooks/use-media-query'

const createScaleVariants = (initialScale: number): Variants => ({
  hidden: {
    opacity: 0,
    scale: initialScale,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
})

export interface ScaleProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Initial scale value
   * @default 0.95
   */
  initialScale?: number
  
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
  
  /**
   * Use spring animation instead of duration
   * @default false
   */
  useSpring?: boolean
  
  /**
   * Spring stiffness (if useSpring is true)
   * @default 200
   */
  stiffness?: number
  
  /**
   * Spring damping (if useSpring is true)
   * @default 20
   */
  damping?: number
}

export const Scale = React.forwardRef<HTMLDivElement, ScaleProps>(
  (
    {
      children,
      initialScale = 0.95,
      duration = 0.3,
      delay = 0,
      easing = 'easeOut',
      animateOnMount = true,
      useSpring = false,
      stiffness = 200,
      damping = 20,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const variants = React.useMemo(
      () => createScaleVariants(initialScale),
      [initialScale]
    )

    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return <div ref={ref} {...props}>{children}</div>
    }

    const transition = useSpring
      ? {
          type: 'spring' as const,
          stiffness,
          damping,
          delay,
        }
      : {
          duration,
          delay,
          ease: easing,
        }

    return (
      <motion.div
        ref={ref}
        initial={animateOnMount ? 'hidden' : 'visible'}
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Scale.displayName = 'Scale'
