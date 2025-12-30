/**
 * Class Name Utility
 * 
 * Combines clsx for conditional className handling and tailwind-merge
 * for intelligent Tailwind CSS class deduplication and conflict resolution
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names intelligently, handling Tailwind CSS conflicts
 * 
 * @example
 * cn('px-4 py-2', 'px-6') // Result: 'px-6 py-2'
 * cn('text-red-500', condition && 'text-blue-500') // Conditional classes
 * cn(['bg-white', 'text-black'], { 'font-bold': isActive }) // Arrays and objects
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Type helper for className prop
 */
export type ClassName = ClassValue
