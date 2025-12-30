/**
 * Design System - Token Exports
 * 
 * Central export point for all design tokens
 */

export * from './colors'
export * from './spacing'
export * from './typography'
export * from './motion'
export * from './breakpoints'

/**
 * Default theme object combining all tokens
 */
import { colors } from './colors'
import { spacing, semanticSpacing } from './spacing'
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } from './typography'
import { duration, easing, transition, animation, spring } from './motion'
import { breakpoints, mediaQueries, containerMaxWidth } from './breakpoints'

export const theme = {
  colors,
  spacing,
  semanticSpacing,
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textStyles,
  },
  motion: {
    duration,
    easing,
    transition,
    animation,
    spring,
  },
  breakpoints,
  mediaQueries,
  containerMaxWidth,
} as const

export type Theme = typeof theme
