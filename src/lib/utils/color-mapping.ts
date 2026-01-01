/**
 * CanonStrata Color Mapping Utility
 * Token-enforced color resolution
 * 
 * NOTE: This is a temporary utility during token migration.
 * Will be replaced by full Design Token system.
 */

import { colors } from '../../../design-system/tokens/colors';

export function resolveColor(colorKey: string): string {
  const colorMap: Record<string, string> = {
    primary: colors.primary[500],
    secondary: colors.primary[600],
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.info[500],
  };
  
  return colorMap[colorKey] || colors.gray[500];
}
