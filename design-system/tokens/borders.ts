/**
 * CanonStrata Design System - Border Tokens
 * Constitutional guarantee: All border widths must reference these tokens
 */

export const borders = {
  none: '0',
  xs: '1px',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '16px',
} as const;

export type BorderWidth = keyof typeof borders;
