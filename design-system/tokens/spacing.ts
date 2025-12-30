/**
 * Design System - Spacing Tokens
 * 
 * Consistent spacing scale based on 4px base unit
 * Following 8-point grid system for visual harmony
 */

export const spacing = {
  // Base unit: 4px
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  18: '4.5rem',    // 72px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  88: '22rem',     // 352px
  96: '24rem',     // 384px
  128: '32rem',    // 512px
} as const

/**
 * Semantic spacing tokens for common use cases
 */
export const semanticSpacing = {
  // Component spacing
  component: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
    '2xl': spacing[12], // 48px
  },
  
  // Layout spacing
  layout: {
    xs: spacing[4],    // 16px
    sm: spacing[6],    // 24px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
    xl: spacing[16],   // 64px
    '2xl': spacing[24], // 96px
    '3xl': spacing[32], // 128px
  },
  
  // Section spacing (vertical rhythm)
  section: {
    xs: spacing[8],    // 32px
    sm: spacing[12],   // 48px
    md: spacing[16],   // 64px
    lg: spacing[24],   // 96px
    xl: spacing[32],   // 128px
    '2xl': spacing[40], // 160px
    '3xl': spacing[48], // 192px
  },
  
  // Container padding
  container: {
    mobile: spacing[4],    // 16px
    tablet: spacing[6],    // 24px
    desktop: spacing[8],   // 32px
  },
  
  // Gap spacing (for flex/grid)
  gap: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
  },
} as const

/**
 * Negative spacing for overlapping elements
 */
export const negativeSpacing = {
  1: '-0.25rem',   // -4px
  2: '-0.5rem',    // -8px
  3: '-0.75rem',   // -12px
  4: '-1rem',      // -16px
  5: '-1.25rem',   // -20px
  6: '-1.5rem',    // -24px
  8: '-2rem',      // -32px
  10: '-2.5rem',   // -40px
  12: '-3rem',     // -48px
  16: '-4rem',     // -64px
} as const

export type SpacingToken = keyof typeof spacing
export type SemanticSpacingCategory = keyof typeof semanticSpacing
export type SemanticSpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

/**
 * Helper function to get spacing value
 */
export function getSpacing(token: SpacingToken): string {
  return spacing[token]
}

/**
 * Helper function to get semantic spacing value
 */
export function getSemanticSpacing(
  category: SemanticSpacingCategory,
  size: SemanticSpacingSize
): string {
  return semanticSpacing[category][size as keyof (typeof semanticSpacing)[typeof category]]
}
