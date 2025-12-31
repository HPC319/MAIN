/**
 * CanonStrata Motion Kernel
 * Constitutional authority for all motion in the system
 * Enforces reduced-motion support
 */

'use client'

import { motion as framerMotion, MotionProps, Variants as FramerVariants } from 'framer-motion'
import { useEffect, useState } from 'react'

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export const motion = framerMotion
export type Variants = FramerVariants
export type HTMLMotionProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = MotionProps
// Suppress unused type parameter warning
export type HTMLMotionPropsDiv = HTMLMotionProps<'div'>
export type { MotionProps, Transition, Easing } from 'framer-motion'

export const motionConfig = {
  reducedMotion: 'user',
  strict: true,
} as const
