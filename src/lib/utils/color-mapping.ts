/**
 * CanonStrata Color Mapping Utility
 * Token-enforced color resolution
 */

import { theme } from '../../../design-system/tokens'

export function resolveColor(colorKey: string): string {
  const colorMap: Record<string, string> = {
    primary: theme.colors.primary.main,
    secondary: theme.colors.secondary.main,
    success: theme.colors.semantic.success,
    warning: theme.colors.semantic.warning,
    error: theme.colors.semantic.error,
    info: theme.colors.semantic.info,
  }
  
  return colorMap[colorKey] || theme.colors.neutral[500]
}
