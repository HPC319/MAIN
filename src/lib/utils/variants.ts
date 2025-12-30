/**
 * Class Variance Authority (CVA) Helper Functions
 * 
 * Utilities for working with CVA-based component variants
 */

import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassValue } from 'clsx'

/**
 * Re-export CVA types and utilities
 */
export { cva, type VariantProps }

/**
 * Helper type to extract variant props from a CVA component
 */
export type ExtractVariantProps<T> = T extends (...args: unknown[]) => infer R
  ? VariantProps<T>
  : never

/**
 * Helper to create a compound variant configuration
 */
export function createCompoundVariants<T extends Record<string, unknown>>(
  variants: Array<{
    condition: Partial<T>
    className: ClassValue
  }>
) {
  return variants.map(({ condition, className }) => ({
    ...condition,
    class: className,
  }))
}

/**
 * Helper to create default variants configuration
 */
export function createDefaultVariants<T extends Record<string, unknown>>(
  defaults: Partial<T>
): Partial<T> {
  return defaults
}

/**
 * Type-safe variant creator with better TypeScript inference
 */
export interface VariantConfig<V extends Record<string, unknown>> {
  base?: ClassValue
  variants?: V
  compoundVariants?: Array<{
    [K in keyof V]?: V[K] extends Record<string, unknown> ? keyof V[K] : never
  } & {
    class: ClassValue
  }>
  defaultVariants?: {
    [K in keyof V]?: V[K] extends Record<string, unknown> ? keyof V[K] : never
  }
}

/**
 * Create a variant function with enhanced type safety
 */
export function createVariants<V extends Record<string, Record<string, ClassValue>>>(
  config: VariantConfig<V>
) {
  return cva(config.base || '', {
    variants: config.variants as V,
    compoundVariants: config.compoundVariants as Array<{
      [K in keyof V]?: V[K] extends Record<string, ClassValue> ? keyof V[K] : never
    } & {
      class: ClassValue
    }>,
    defaultVariants: config.defaultVariants as {
      [K in keyof V]?: V[K] extends Record<string, ClassValue> ? keyof V[K] : never
    },
  })
}

/**
 * Example usage helper - creates a variant with common patterns
 */
export const commonVariants = {
  size: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
  variant: {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  },
} as const
