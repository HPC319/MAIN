/**
 * Design System - Typography Tokens
 * 
 * Comprehensive type system with font families, sizes, weights, and line heights
 * Optimized for readability and visual hierarchy
 */

/**
 * Font Families
 */
export const fontFamily = {
  sans: [
    'var(--font-sans)',
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(', '),
  
  mono: [
    'var(--font-mono)',
    '"Fira Code"',
    '"JetBrains Mono"',
    'Menlo',
    'Monaco',
    '"Courier New"',
    'monospace',
  ].join(', '),
  
  serif: [
    'Georgia',
    'Cambria',
    '"Times New Roman"',
    'Times',
    'serif',
  ].join(', '),
} as const

/**
 * Font Sizes with corresponding line heights
 */
export const fontSize = {
  xs: {
    size: '0.75rem',      // 12px
    lineHeight: '1rem',    // 16px
    letterSpacing: '0.05em',
  },
  sm: {
    size: '0.875rem',     // 14px
    lineHeight: '1.25rem', // 20px
    letterSpacing: '0.025em',
  },
  base: {
    size: '1rem',         // 16px
    lineHeight: '1.5rem',  // 24px
    letterSpacing: '0',
  },
  lg: {
    size: '1.125rem',     // 18px
    lineHeight: '1.75rem', // 28px
    letterSpacing: '-0.01em',
  },
  xl: {
    size: '1.25rem',      // 20px
    lineHeight: '1.75rem', // 28px
    letterSpacing: '-0.015em',
  },
  '2xl': {
    size: '1.5rem',       // 24px
    lineHeight: '2rem',    // 32px
    letterSpacing: '-0.02em',
  },
  '3xl': {
    size: '1.875rem',     // 30px
    lineHeight: '2.25rem', // 36px
    letterSpacing: '-0.025em',
  },
  '4xl': {
    size: '2.25rem',      // 36px
    lineHeight: '2.5rem',  // 40px
    letterSpacing: '-0.03em',
  },
  '5xl': {
    size: '3rem',         // 48px
    lineHeight: '1',       // 48px
    letterSpacing: '-0.035em',
  },
  '6xl': {
    size: '3.75rem',      // 60px
    lineHeight: '1',       // 60px
    letterSpacing: '-0.04em',
  },
  '7xl': {
    size: '4.5rem',       // 72px
    lineHeight: '1',       // 72px
    letterSpacing: '-0.045em',
  },
  '8xl': {
    size: '6rem',         // 96px
    lineHeight: '1',       // 96px
    letterSpacing: '-0.05em',
  },
  '9xl': {
    size: '8rem',         // 128px
    lineHeight: '1',       // 128px
    letterSpacing: '-0.05em',
  },
} as const

/**
 * Font Weights
 */
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const

/**
 * Line Heights (relative)
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const

/**
 * Letter Spacing
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

/**
 * Text Semantic Styles (common text patterns)
 */
export const textStyles = {
  // Display styles (hero, large headlines)
  display: {
    '2xl': {
      fontSize: fontSize['7xl'].size,
      lineHeight: fontSize['7xl'].lineHeight,
      letterSpacing: fontSize['7xl'].letterSpacing,
      fontWeight: fontWeight.extrabold,
      fontFamily: fontFamily.sans,
    },
    xl: {
      fontSize: fontSize['6xl'].size,
      lineHeight: fontSize['6xl'].lineHeight,
      letterSpacing: fontSize['6xl'].letterSpacing,
      fontWeight: fontWeight.extrabold,
      fontFamily: fontFamily.sans,
    },
    lg: {
      fontSize: fontSize['5xl'].size,
      lineHeight: fontSize['5xl'].lineHeight,
      letterSpacing: fontSize['5xl'].letterSpacing,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.sans,
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontSize: fontSize['4xl'].size,
      lineHeight: fontSize['4xl'].lineHeight,
      letterSpacing: fontSize['4xl'].letterSpacing,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.sans,
    },
    h2: {
      fontSize: fontSize['3xl'].size,
      lineHeight: fontSize['3xl'].lineHeight,
      letterSpacing: fontSize['3xl'].letterSpacing,
      fontWeight: fontWeight.bold,
      fontFamily: fontFamily.sans,
    },
    h3: {
      fontSize: fontSize['2xl'].size,
      lineHeight: fontSize['2xl'].lineHeight,
      letterSpacing: fontSize['2xl'].letterSpacing,
      fontWeight: fontWeight.semibold,
      fontFamily: fontFamily.sans,
    },
    h4: {
      fontSize: fontSize.xl.size,
      lineHeight: fontSize.xl.lineHeight,
      letterSpacing: fontSize.xl.letterSpacing,
      fontWeight: fontWeight.semibold,
      fontFamily: fontFamily.sans,
    },
    h5: {
      fontSize: fontSize.lg.size,
      lineHeight: fontSize.lg.lineHeight,
      letterSpacing: fontSize.lg.letterSpacing,
      fontWeight: fontWeight.semibold,
      fontFamily: fontFamily.sans,
    },
    h6: {
      fontSize: fontSize.base.size,
      lineHeight: fontSize.base.lineHeight,
      letterSpacing: fontSize.base.letterSpacing,
      fontWeight: fontWeight.semibold,
      fontFamily: fontFamily.sans,
    },
  },
  
  // Body text styles
  body: {
    lg: {
      fontSize: fontSize.lg.size,
      lineHeight: lineHeight.relaxed,
      fontWeight: fontWeight.normal,
      fontFamily: fontFamily.sans,
    },
    base: {
      fontSize: fontSize.base.size,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.normal,
      fontFamily: fontFamily.sans,
    },
    sm: {
      fontSize: fontSize.sm.size,
      lineHeight: lineHeight.normal,
      fontWeight: fontWeight.normal,
      fontFamily: fontFamily.sans,
    },
  },
  
  // UI text styles
  ui: {
    label: {
      fontSize: fontSize.sm.size,
      lineHeight: fontSize.sm.lineHeight,
      fontWeight: fontWeight.medium,
      letterSpacing: letterSpacing.wide,
      textTransform: 'uppercase' as const,
      fontFamily: fontFamily.sans,
    },
    caption: {
      fontSize: fontSize.xs.size,
      lineHeight: fontSize.xs.lineHeight,
      fontWeight: fontWeight.normal,
      fontFamily: fontFamily.sans,
    },
    overline: {
      fontSize: fontSize.xs.size,
      lineHeight: fontSize.xs.lineHeight,
      fontWeight: fontWeight.semibold,
      letterSpacing: letterSpacing.widest,
      textTransform: 'uppercase' as const,
      fontFamily: fontFamily.sans,
    },
  },
  
  // Code styles
  code: {
    inline: {
      fontSize: fontSize.sm.size,
      fontFamily: fontFamily.mono,
      fontWeight: fontWeight.normal,
    },
    block: {
      fontSize: fontSize.sm.size,
      lineHeight: lineHeight.relaxed,
      fontFamily: fontFamily.mono,
      fontWeight: fontWeight.normal,
    },
  },
} as const

export type FontSize = keyof typeof fontSize
export type FontWeight = keyof typeof fontWeight
export type LineHeight = keyof typeof lineHeight
export type LetterSpacing = keyof typeof letterSpacing
export type TextStyle = keyof typeof textStyles

/**
 * Helper function to get font size configuration
 */
export function getFontSize(size: FontSize) {
  return fontSize[size]
}

/**
 * Helper function to get text style configuration
 */
export function getTextStyle(
  category: keyof typeof textStyles,
  variant: string
) {
  return (textStyles[category] as any)[variant]
}
