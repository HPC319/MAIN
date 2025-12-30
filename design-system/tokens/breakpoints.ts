/**
 * Design System - Breakpoint Tokens
 * 
 * Responsive breakpoint system following CanonStrata constitutional requirements
 */

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const

export const containerMaxWidth = {
  xs: breakpoints.xs,
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  '2xl': '1440px',
} as const

export type Breakpoints = typeof breakpoints
export type MediaQueries = typeof mediaQueries
export type ContainerMaxWidth = typeof containerMaxWidth
