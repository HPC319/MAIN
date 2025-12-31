import type { ClassValue } from 'clsx'

/**
 * Variant configuration type
 */
export type VariantConfig<V extends Record<string, Record<string, ClassValue>>> = {
  variants: V
  defaultVariants?: {
    [K in keyof V]?: keyof V[K]
  }
  compoundVariants?: Array<{
    condition: {
      [K in keyof V]?: keyof V[K]
    }
    className: ClassValue
  }>
}

/**
 * Extract variant props from a variant configuration
 */
export type VariantProps<T extends VariantConfig<Record<string, Record<string, ClassValue>>>> = {
  [K in keyof T['variants']]?: keyof T['variants'][K]
}

/**
 * Helper to create a compound variant configuration
 */
export function createCompoundVariants<T extends Record<string, Record<string, ClassValue>>>(
  variants: Array<{
    condition: Partial<{
      [K in keyof T]?: keyof T[K]
    }>
    className: ClassValue
  }>
): Array<{
  condition: Partial<{
    [K in keyof T]?: keyof T[K]
  }>
  className: ClassValue
}> {
  return variants
}

/**
 * Helper to merge variant configurations
 */
export function mergeVariants<
  T extends VariantConfig<Record<string, Record<string, ClassValue>>>,
  U extends VariantConfig<Record<string, Record<string, ClassValue>>>
>(
  config1: T,
  config2: U
): VariantConfig<T['variants'] & U['variants']> {
  return {
    variants: { ...config1.variants, ...config2.variants },
    defaultVariants: {
      ...config1.defaultVariants,
      ...config2.defaultVariants,
    },
    compoundVariants: [
      ...(config1.compoundVariants || []),
      ...(config2.compoundVariants || []),
    ],
  }
}
