/**
 * Design System - Breakpoint Tokens
 * 
 * Responsive breakpoints for consistent cross-device experiences
 * Following mobile-first approach
 */

/**
 * Breakpoint values in pixels
 */
export const breakpointValues = {
  xs: 0,       // Extra small devices (phones in portrait)
  sm: 640,     // Small devices (phones in landscape)
  md: 768,     // Medium devices (tablets in portrait)
  lg: 1024,    // Large devices (tablets in landscape, small laptops)
  xl: 1280,    // Extra large devices (laptops, desktops)
  '2xl': 1536, // 2X extra large devices (large desktops)
  '3xl': 1920, // 3X extra large devices (ultra-wide displays)
} as const

/**
 * Breakpoints in rem units (divide by 16)
 */
export const breakpoints = {
  xs: '0rem',
  sm: '40rem',      // 640px
  md: '48rem',      // 768px
  lg: '64rem',      // 1024px
  xl: '80rem',      // 1280px
  '2xl': '96rem',   // 1536px
  '3xl': '120rem',  // 1920px
} as const

/**
 * Media query strings
 */
export const mediaQueries = {
  // Min-width queries (mobile-first)
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  '3xl': `@media (min-width: ${breakpoints['3xl']})`,
  
  // Max-width queries (desktop-first)
  maxXs: `@media (max-width: ${breakpoints.xs})`,
  maxSm: `@media (max-width: calc(${breakpoints.sm} - 0.0625rem))`,
  maxMd: `@media (max-width: calc(${breakpoints.md} - 0.0625rem))`,
  maxLg: `@media (max-width: calc(${breakpoints.lg} - 0.0625rem))`,
  maxXl: `@media (max-width: calc(${breakpoints.xl} - 0.0625rem))`,
  max2xl: `@media (max-width: calc(${breakpoints['2xl']} - 0.0625rem))`,
  max3xl: `@media (max-width: calc(${breakpoints['3xl']} - 0.0625rem))`,
  
  // Range queries
  smToMd: `@media (min-width: ${breakpoints.sm}) and (max-width: calc(${breakpoints.md} - 0.0625rem))`,
  mdToLg: `@media (min-width: ${breakpoints.md}) and (max-width: calc(${breakpoints.lg} - 0.0625rem))`,
  lgToXl: `@media (min-width: ${breakpoints.lg}) and (max-width: calc(${breakpoints.xl} - 0.0625rem))`,
  xlTo2xl: `@media (min-width: ${breakpoints.xl}) and (max-width: calc(${breakpoints['2xl']} - 0.0625rem))`,
  
  // Device-specific queries
  mobile: `@media (max-width: calc(${breakpoints.md} - 0.0625rem))`,
  tablet: `@media (min-width: ${breakpoints.md}) and (max-width: calc(${breakpoints.lg} - 0.0625rem))`,
  desktop: `@media (min-width: ${breakpoints.lg})`,
  
  // Orientation queries
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  
  // Special feature queries
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
  highContrast: '@media (prefers-contrast: high)',
} as const

/**
 * Container max-widths for each breakpoint
 */
export const containerMaxWidth = {
  xs: '100%',
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  '2xl': '1400px',  // Constrained max-width for better readability
  '3xl': '1600px',
} as const

/**
 * Common device categories
 */
export const devices = {
  mobile: {
    min: breakpointValues.xs,
    max: breakpointValues.md - 1,
    name: 'Mobile',
  },
  tablet: {
    min: breakpointValues.md,
    max: breakpointValues.lg - 1,
    name: 'Tablet',
  },
  desktop: {
    min: breakpointValues.lg,
    max: breakpointValues['2xl'] - 1,
    name: 'Desktop',
  },
  wide: {
    min: breakpointValues['2xl'],
    max: Infinity,
    name: 'Wide Desktop',
  },
} as const

export type Breakpoint = keyof typeof breakpoints
export type MediaQuery = keyof typeof mediaQueries
export type Device = keyof typeof devices

/**
 * Helper function to check if window width matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpointValues[breakpoint]
}

/**
 * Helper function to get current device category
 */
export function getCurrentDevice(): Device | null {
  if (typeof window === 'undefined') return null
  
  const width = window.innerWidth
  
  for (const [key, value] of Object.entries(devices)) {
    if (width >= value.min && width <= value.max) {
      return key as Device
    }
  }
  
  return null
}

/**
 * Helper function to get media query string
 */
export function getMediaQuery(query: MediaQuery): string {
  return mediaQueries[query]
}

/**
 * Hook helper types for responsive design
 */
export interface ResponsiveValue<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
  '3xl'?: T
}

/**
 * Helper to resolve responsive value for current breakpoint
 */
export function resolveResponsiveValue<T>(
  value: T | ResponsiveValue<T>,
  currentBreakpoint: Breakpoint
): T {
  if (typeof value !== 'object' || value === null) {
    return value as T
  }
  
  const responsive = value as ResponsiveValue<T>
  const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)
  
  // Find the closest defined value at or below current breakpoint
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i]
    if (responsive[bp] !== undefined) {
      return responsive[bp] as T
    }
  }
  
  // Fallback to first defined value
  for (const bp of breakpointOrder) {
    if (responsive[bp] !== undefined) {
      return responsive[bp] as T
    }
  }
  
  return value as T
}
