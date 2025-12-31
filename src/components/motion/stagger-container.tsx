/**
 * StaggerContainer Motion Component
 * 
 * Container for staggered children animations with Framer Motion
 * Respects prefers-reduced-motion for accessibility
 */

'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps, type Variants } from '@/lib/motion-kernel'
import { usePrefersReducedMotion } from '@/lib/hooks/use-media-query'

// Container variants - unused but kept for reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export interface StaggerContainerProps
  extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Delay between each child animation in seconds
   * @default 0.1
   */
  staggerDelay?: number
  
  /**
   * Initial delay before first child animates in seconds
   * @default 0
   */
  delayChildren?: number
  
  /**
   * Whether to animate on mount
   * @default true
   */
  animateOnMount?: boolean
  
  /**
   * Custom child variants (overrides default)
   */
  childVariants?: Variants
}

export const StaggerContainer = React.forwardRef<
  HTMLDivElement,
  StaggerContainerProps
>(
  (
    {
      children,
      staggerDelay = 0.1,
      delayChildren = 0,
      animateOnMount = true,
      childVariants,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    const customContainerVariants: Variants = React.useMemo(
      () => ({
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }),
      [staggerDelay, delayChildren]
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
        variants={customContainerVariants}
        {...(props as unknown as React.ComponentProps<typeof motion.div>)}
      >
        {children as React.ReactNode}
      </motion.div>
    )
  }
)

StaggerContainer.displayName = 'StaggerContainer'

/**
 * StaggerItem Component
 * 
 * Individual item for use within StaggerContainer
 */
export interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Custom variants (overrides default)
   */
  variants?: Variants
}

export const StaggerItem = React.forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ children, variants = staggerItemVariants, ...props }, ref) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return <div ref={ref} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>{children as React.ReactNode}</div>
    }

    return (
      <motion.div ref={ref} variants={variants} {...props}>
        {children}
      </motion.div>
    )
  }
)

StaggerItem.displayName = 'StaggerItem'
