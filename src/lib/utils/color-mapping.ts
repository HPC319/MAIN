/**
 * Hardcoded Color to Design Token Mapping
 * Maps legacy hex colors to semantic design tokens
 */

export const colorMapping: Record<string, string> = {
  // Primary blues
  '#3758F9': 'text-primary-600',
  '#3056D3': 'text-primary-700',
  '#4064AC': 'text-primary-700',
  
  // Dark backgrounds
  '#090E34': 'bg-gray-950',
  
  // Grays and borders
  '#8890A4': 'text-gray-400 border-gray-400',
  
  // Success/secondary greens
  '#0BB489': 'bg-emerald-600',
  '#34A853': 'fill-emerald-600',
  
  // Social media brand colors
  '#4285F4': 'fill-blue-600',
  '#FBBC05': 'fill-yellow-500',
  '#EB4335': 'fill-red-600',
  '#55ACEE': 'fill-sky-500',
  '#007AB9': 'fill-blue-700',
};

/**
 * Convert hex color to design token
 */
export function hexToToken(hex: string): string {
  return colorMapping[hex] || hex;
}
