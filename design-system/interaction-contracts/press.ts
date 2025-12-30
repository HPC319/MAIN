/**
 * Press/Active Interaction Contracts
 * Standardized active states for interactive elements
 */

export const pressContracts = {
  // Subtle press for cards and surfaces
  subtle: "active:scale-[0.98] active:opacity-90 transition-transform duration-100",
  
  // Standard press for buttons
  standard: "active:scale-95 transition-transform duration-100",
  
  // Deep press for primary actions
  deep: "active:scale-90 active:shadow-inner transition-all duration-100",
  
  // Bounce press for playful interactions
  bounce: "active:scale-95 active:translate-y-0.5 transition-all duration-100",
  
  // No press for disabled or static elements
  none: "",
} as const;

export type PressContract = keyof typeof pressContracts;
