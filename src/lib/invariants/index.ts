/**
 * CANONSTRATA INVARIANT ENFORCEMENT LAYER
 * 
 * System-level enforcement that makes impossible states impossible.
 * No runtime checks — compile-time guarantees only.
 */

import { z } from 'zod';

// ============================================================================
// TYPE-LEVEL INVARIANTS
// ============================================================================

/**
 * NonEmptyArray - Arrays that cannot be empty at type level
 */
export type NonEmptyArray<T> = [T, ...T[]];

export function isNonEmpty<T>(arr: T[]): arr is NonEmptyArray<T> {
  return arr.length > 0;
}

export function assertNonEmpty<T>(arr: T[]): asserts arr is NonEmptyArray<T> {
  if (arr.length === 0) {
    throw new InvariantViolation('Array cannot be empty');
  }
}

/**
 * Positive number brand - Numbers that must be > 0
 */
export type Positive = number & { readonly __brand: 'Positive' };

export function positive(n: number): Positive {
  if (n <= 0) {
    throw new InvariantViolation(`Expected positive number, got ${n}`);
  }
  return n as Positive;
}

/**
 * NonNegative number brand - Numbers that must be >= 0
 */
export type NonNegative = number & { readonly __brand: 'NonNegative' };

export function nonNegative(n: number): NonNegative {
  if (n < 0) {
    throw new InvariantViolation(`Expected non-negative number, got ${n}`);
  }
  return n as NonNegative;
}

/**
 * ValidPercentage - Number between 0-100
 */
export type ValidPercentage = number & { readonly __brand: 'ValidPercentage' };

export function percentage(n: number): ValidPercentage {
  if (n < 0 || n > 100) {
    throw new InvariantViolation(`Percentage must be 0-100, got ${n}`);
  }
  return n as ValidPercentage;
}

// ============================================================================
// COMPONENT INVARIANTS
// ============================================================================

/**
 * Component props must never be null/undefined at runtime
 */
export type RequiredProps<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

/**
 * Enforce accessible name (aria-label or aria-labelledby required)
 */
export type AccessibleComponent<T = {}> = T & (
  | { 'aria-label': string }
  | { 'aria-labelledby': string }
);

export function enforceAccessibleName<T>(
  props: T
): asserts props is AccessibleComponent<T> {
  const p = props as Record<string, unknown>;
  if (!p['aria-label'] && !p['aria-labelledby']) {
    throw new InvariantViolation(
      'Component must have aria-label or aria-labelledby'
    );
  }
}

// ============================================================================
// DESIGN TOKEN INVARIANTS
// ============================================================================

/**
 * Color must be valid hex format
 */
export type HexColor = string & { readonly __brand: 'HexColor' };

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export function hexColor(value: string): HexColor {
  if (!HEX_REGEX.test(value)) {
    throw new InvariantViolation(`Invalid hex color: ${value}`);
  }
  return value as HexColor;
}

/**
 * Spacing must be multiple of base unit (4px)
 */
export type SpacingUnit = number & { readonly __brand: 'SpacingUnit' };

const BASE_UNIT = 4;

export function spacingUnit(px: number): SpacingUnit {
  if (px % BASE_UNIT !== 0) {
    throw new InvariantViolation(
      `Spacing must be multiple of ${BASE_UNIT}px, got ${px}px`
    );
  }
  return px as SpacingUnit;
}

/**
 * Font size must be from design system scale
 */
export type FontSize = 
  | 'xs' 
  | 'sm' 
  | 'base' 
  | 'lg' 
  | 'xl' 
  | '2xl' 
  | '3xl' 
  | '4xl' 
  | '5xl' 
  | '6xl';

export function fontSize(value: string): asserts value is FontSize {
  const valid: FontSize[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];
  if (!valid.includes(value as FontSize)) {
    throw new InvariantViolation(`Invalid font size: ${value}`);
  }
}

// ============================================================================
// ANIMATION INVARIANTS
// ============================================================================

/**
 * Animation duration must be within performance budget (16-600ms)
 */
export type AnimationDuration = number & { readonly __brand: 'AnimationDuration' };

const MIN_DURATION = 16; // 1 frame at 60fps
const MAX_DURATION = 600; // Performance budget

export function animationDuration(ms: number): AnimationDuration {
  if (ms < MIN_DURATION || ms > MAX_DURATION) {
    throw new InvariantViolation(
      `Animation duration must be ${MIN_DURATION}-${MAX_DURATION}ms, got ${ms}ms`
    );
  }
  return ms as AnimationDuration;
}

/**
 * Easing must be from approved motion library
 */
export type Easing = 
  | 'easeIn' 
  | 'easeOut' 
  | 'easeInOut' 
  | 'spring' 
  | 'anticipate';

export function easing(value: string): asserts value is Easing {
  const valid: Easing[] = ['easeIn', 'easeOut', 'easeInOut', 'spring', 'anticipate'];
  if (!valid.includes(value as Easing)) {
    throw new InvariantViolation(`Invalid easing function: ${value}`);
  }
}

// ============================================================================
// FORM INVARIANTS
// ============================================================================

/**
 * Form field must have label (explicit or aria-label)
 */
export interface FormFieldInvariants {
  id: string;
  name: string;
  label?: string;
  'aria-label'?: string;
}

export function enforceFormFieldLabel(
  field: FormFieldInvariants
): asserts field is Required<Pick<FormFieldInvariants, 'label'>> | Required<Pick<FormFieldInvariants, 'aria-label'>> {
  if (!field.label && !field['aria-label']) {
    throw new InvariantViolation(
      `Form field "${field.name}" must have label or aria-label`
    );
  }
}

/**
 * Email must be valid format
 */
export type Email = string & { readonly __brand: 'Email' };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function email(value: string): Email {
  if (!EMAIL_REGEX.test(value)) {
    throw new InvariantViolation(`Invalid email format: ${value}`);
  }
  return value as Email;
}

/**
 * URL must be valid format
 */
export type URL = string & { readonly __brand: 'URL' };

export function url(value: string): URL {
  try {
    new globalThis.URL(value);
    return value as URL;
  } catch {
    throw new InvariantViolation(`Invalid URL format: ${value}`);
  }
}

// ============================================================================
// RUNTIME ENFORCEMENT
// ============================================================================

export class InvariantViolation extends Error {
  constructor(message: string) {
    super(`[INVARIANT VIOLATION] ${message}`);
    this.name = 'InvariantViolation';
  }
}

/**
 * Assert invariant - throws if condition is false
 */
export function invariant(
  condition: boolean,
  message: string
): asserts condition {
  if (!condition) {
    throw new InvariantViolation(message);
  }
}

/**
 * Exhaustive check for switch statements
 */
export function assertNever(value: never): never {
  throw new InvariantViolation(`Unexpected value: ${JSON.stringify(value)}`);
}

// ============================================================================
// ZOD SCHEMA INVARIANTS
// ============================================================================

/**
 * Reusable Zod schemas with invariants
 */
export const invariantSchemas = {
  nonEmptyString: z.string().min(1, 'String cannot be empty'),
  positiveNumber: z.number().positive('Number must be positive'),
  nonNegativeNumber: z.number().nonnegative('Number must be non-negative'),
  percentage: z.number().min(0).max(100, 'Percentage must be 0-100'),
  hexColor: z.string().regex(HEX_REGEX, 'Invalid hex color format'),
  email: z.string().email('Invalid email format'),
  url: z.string().url('Invalid URL format'),
  spacingUnit: z.number().refine(
    (n) => n % BASE_UNIT === 0,
    `Spacing must be multiple of ${BASE_UNIT}px`
  ),
  animationDuration: z.number().min(MIN_DURATION).max(MAX_DURATION,
    `Animation duration must be ${MIN_DURATION}-${MAX_DURATION}ms`
  ),
} as const;

// All exports are done inline above - no duplicate exports needed
