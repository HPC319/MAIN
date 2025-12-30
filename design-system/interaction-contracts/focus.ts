/**
 * Focus Interaction Contracts
 * Standardized focus-visible states for accessibility
 */

export const focusContracts = {
  // Standard focus ring for most interactive elements
  standard: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  
  // Inset focus for inputs and form elements
  inset: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
  
  // Subtle focus for secondary elements
  subtle: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-1",
  
  // High contrast focus for critical actions
  highContrast: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4",
  
  // Dark mode aware focus
  adaptive: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
} as const;

export type FocusContract = keyof typeof focusContracts;
