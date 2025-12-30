/**
 * CANONSTRATA RUNTIME ENFORCEMENT
 * Assertions that execute at runtime to enforce invariants
 */

export class CanonStrataViolation extends Error {
  constructor(message: string, public readonly invariant: string) {
    super(`CANONSTRATA VIOLATION: ${message}`);
    this.name = 'CanonStrataViolation';
  }
}

/**
 * Assert that a design token is valid and exists
 */
export function assertToken(value: unknown, context: string): void {
  if (typeof value !== 'string') {
    throw new CanonStrataViolation(
      `Invalid token type in ${context}. Expected string token reference.`,
      'TOKEN_GATES'
    );
  }
  
  // Detect hardcoded values
  if (/^#[0-9A-Fa-f]{3,8}$/.test(value) || /^rgba?\(/.test(value)) {
    throw new CanonStrataViolation(
      `Hardcoded color detected in ${context}. Use design tokens only.`,
      'TOKEN_GATES'
    );
  }
  
  if (/^\d+(px|rem|em)$/.test(value)) {
    throw new CanonStrataViolation(
      `Hardcoded size detected in ${context}. Use design tokens only.`,
      'TOKEN_GATES'
    );
  }
}

/**
 * Assert that motion is kernel-authorized
 */
export function assertMotionAuthorized(source: string): void {
  const unauthorized = ['framer-motion', 'react-spring', 'gsap'];
  if (unauthorized.includes(source)) {
    throw new CanonStrataViolation(
      `Unauthorized motion library: ${source}. Only kernel motion allowed.`,
      'MOTION_GOVERNANCE'
    );
  }
}

/**
 * Assert that component is server-first
 */
export function assertServerComponent(hasClientDirective: boolean, componentName: string): void {
  if (hasClientDirective) {
    console.warn(
      `CANONSTRATA WARNING: ${componentName} uses 'use client'. Verify necessity per Server Components default.`
    );
  }
}

/**
 * Validate that no inline styles exist
 */
export function assertNoInlineStyles(props: Record<string, unknown>, componentName: string): void {
  if ('style' in props && props.style !== undefined) {
    throw new CanonStrataViolation(
      `Inline styles detected in ${componentName}. Use design tokens only.`,
      'SYSTEM_PROHIBITIONS'
    );
  }
}
