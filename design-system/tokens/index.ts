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
export * from './borders'
export * from './radii'
export * from './transitions'
export * from './shadows'

/**
 * Default theme object combining all tokens
 */
import { colors } from './colors'
import { spacing, semanticSpacing } from './spacing'
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } from './typography'
import { duration, easing, transition, animation, spring } from './motion'
import { breakpoints, mediaQueries, containerMaxWidth } from './breakpoints'
import { borders } from './borders'
import { radii } from './radii'
import { transitions } from './transitions'
import { shadows } from './shadows'

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
  borders,
  radii,
  transitions,
  shadows,
} as const

export type Theme = typeof theme
