/**
 * CanonStrata Design System - Transition Tokens
 * Constitutional guarantee: All transitions must reference these tokens
 */

export const transitions = {
  instant: '0ms',
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
  slower: '500ms ease-in-out',
} as const;

export type Transition = keyof typeof transitions;
