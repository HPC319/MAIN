/**
 * CanonStrata Design System - Border Radius Tokens
 * Constitutional guarantee: All border radii must reference these tokens
 */

export const radii = {
  none: '0',
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

export type BorderRadius = keyof typeof radii;
