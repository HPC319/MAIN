/**
 * CanonStrata Color Mapping Utility
 * Token-enforced color resolution
 */

import { theme } from '../../../design-system/tokens'

export function resolveColor(colorKey: string): string {
  const colorMap: Record<string, string> = {
    primary: theme.colors.primary[500],
    secondary: theme.colors.primary[600],
    success: theme.colors.success[500],
    warning: theme.colors.warning[500],
    error: theme.colors.error[500],
    info: theme.colors.primary[500],
  }
  
  return colorMap[colorKey] || theme.colors.gray[500]
}
