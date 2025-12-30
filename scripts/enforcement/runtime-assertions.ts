/**
 * CANONSTRATA RUNTIME ASSERTIONS
 * Enforces invariants during execution
 * VIOLATION = RUNTIME FAILURE
 */

export class CanonStrataViolationError extends Error {
  constructor(message: string, public readonly invariant: string) {
    super(`CANONSTRATA VIOLATION: ${message}`);
    this.name = 'CanonStrataViolationError';
  }
}

/**
 * Assert that a value is defined (not null or undefined)
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message: string,
  invariant: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new CanonStrataViolationError(message, invariant);
  }
}

/**
 * Assert that a design token exists
 */
export function assertTokenExists(
  token: unknown,
  tokenPath: string
): asserts token is NonNullable<typeof token> {
  if (token === null || token === undefined) {
    throw new CanonStrataViolationError(
      `Missing required design token: ${tokenPath}`,
      'TOKEN_COMPLETENESS'
    );
  }
}

/**
 * Assert that motion is authorized
 */
export function assertMotionAuthorized(
  context: string,
  isKernelAuthorized: boolean
): void {
  if (!isKernelAuthorized) {
    throw new CanonStrataViolationError(
      `Unauthorized motion in: ${context}. Only kernel-authorized motion allowed.`,
      'MOTION_GOVERNANCE'
    );
  }
}

/**
 * Assert that no inline styles are present
 */
export function assertNoInlineStyles(
  props: Record<string, unknown>,
  componentName: string
): void {
  if ('style' in props) {
    throw new CanonStrataViolationError(
      `Inline style detected in component: ${componentName}. Use design tokens only.`,
      'NO_INLINE_STYLES'
    );
  }
}

/**
 * Assert that a component is server-side only
 */
export function assertServerOnly(context: string): void {
  if (typeof window !== 'undefined') {
    throw new CanonStrataViolationError(
      `Server-only code executed on client: ${context}`,
      'SERVER_COMPONENT_BOUNDARY'
    );
  }
}

/**
 * Assert that a component is client-side safe
 */
export function assertClientSafe(
  hasClientDirective: boolean,
  componentName: string
): void {
  if (!hasClientDirective && typeof window !== 'undefined') {
    throw new CanonStrataViolationError(
      `Client-side code in server component: ${componentName}. Add 'use client' directive.`,
      'CLIENT_BOUNDARY_VIOLATION'
    );
  }
}

/**
 * Runtime configuration validator
 */
export function validateRuntimeConfig(config: Record<string, unknown>): void {
  const requiredKeys = ['designTokens', 'motionKernel', 'renderingStrategy'];
  
  for (const key of requiredKeys) {
    if (!(key in config)) {
      throw new CanonStrataViolationError(
        `Missing required runtime configuration: ${key}`,
        'RUNTIME_CONFIG'
      );
    }
  }
}

/**
 * Development-only assertion (removed in production)
 */
export function devAssert(condition: boolean, message: string, invariant: string): void {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    throw new CanonStrataViolationError(message, invariant);
  }
}

/**
 * Production-safe assertion (always active)
 */
export function invariantAssert(
  condition: boolean,
  message: string,
  invariant: string
): asserts condition {
  if (!condition) {
    throw new CanonStrataViolationError(message, invariant);
  }
}

/**
 * Type guard for token values
 */
export function isValidToken(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

/**
 * Validate that all design tokens are properly structured
 */
export function validateTokenStructure(
  tokens: Record<string, unknown>,
  category: string
): void {
  for (const [key, value] of Object.entries(tokens)) {
    if (!isValidToken(value) && typeof value !== 'object') {
      throw new CanonStrataViolationError(
        `Invalid token value for ${category}.${key}: must be string, number, or nested object`,
        'TOKEN_STRUCTURE'
      );
    }
  }
}
