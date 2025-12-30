/**
 * useMediaQuery Hook
 * 
 * React hook for responsive design based on CSS media queries
 * Supports SSR with hydration-safe implementation
 */

'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to check if a media query matches
 * 
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const prefersD arkMode = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with undefined to prevent hydration mismatch
  const [matches, setMatches] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
    // Legacy browsers
    else {
      // @ts-ignore - deprecated but still needed for old browsers
      mediaQuery.addListener(handler)
      // @ts-ignore
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  // Return false during SSR to prevent hydration mismatch
  return matches ?? false
}

/**
 * Predefined breakpoint hooks using common breakpoints
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1280px)')
}

/**
 * Check for specific breakpoints (Tailwind-style)
 */
export function useBreakpoint(breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean {
  const queries = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  }
  
  return useMediaQuery(queries[breakpoint])
}

/**
 * Check for user preferences
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersLightMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: light)')
}

export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}

/**
 * Check for device capabilities
 */
export function useHasHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

export function useIsTouchDevice(): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

/**
 * Check for orientation
 */
export function useIsPortrait(): boolean {
  return useMediaQuery('(orientation: portrait)')
}

export function useIsLandscape(): boolean {
  return useMediaQuery('(orientation: landscape)')
}
