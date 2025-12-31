/**
 * Hover Interaction Contracts
 * Standardized hover states for interactive elements
 */

export const hoverContracts = {
  // Subtle hover for cards and surfaces
  subtle: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200",
  
  // Standard hover for buttons and links
  standard: "hover:opacity-90 hover:scale-[1.02] transition-all duration-200",
  
  // Elevated hover for primary actions
  elevated: "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
  
  // Underline hover for text links
  underline: "hover:underline underline-offset-4 transition-all duration-150",
  
  // Border hover for outlined elements
  border: "hover:border-primary hover:text-primary transition-colors duration-200",
  
  // Glow hover for featured elements
  glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-300",
  
  // Scale hover
  scale: "hover:scale-105 transition-transform duration-200",
  
  // Lift hover
  lift: "hover:shadow-md hover:-translate-y-1 transition-all duration-200",
  
  // Brighten hover
  brighten: "hover:brightness-110 transition-all duration-200",
  
  // Fade in hover
  fadeIn: "hover:opacity-100 transition-opacity duration-200",
} as const;

export type HoverContract = keyof typeof hoverContracts;

// Export as hoverStates for backward compatibility
export const hoverStates = hoverContracts;
