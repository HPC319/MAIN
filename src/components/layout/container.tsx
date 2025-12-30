/**
 * Container Layout Component
 * 
 * Responsive container with max-width constraints and horizontal padding
 * Provides consistent content width across breakpoints
 */

'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',      // 640px
      md: 'max-w-screen-md',      // 768px
      lg: 'max-w-screen-lg',      // 1024px
      xl: 'max-w-screen-xl',      // 1280px
      '2xl': 'max-w-screen-2xl',  // 1536px
      full: 'max-w-full',
      prose: 'max-w-prose',        // ~65ch for optimal reading
    },
    padding: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
      xl: 'px-12',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'md',
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Render as a different HTML element
   * @default 'div'
   */
  as?: React.ElementType
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'
