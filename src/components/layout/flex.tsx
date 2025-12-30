/**
 * Flex Layout Component
 * 
 * Flexible flexbox layout with common patterns
 * Provides easy-to-use flex utilities
 */

'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'nowrap',
    gap: 'none',
  },
})

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  /**
   * Render as a different HTML element
   * @default 'div'
   */
  as?: React.ElementType
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      align,
      justify,
      wrap,
      gap,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          flexVariants({ direction, align, justify, wrap, gap }),
          className
        )}
        {...props}
      />
    )
  }
)

Flex.displayName = 'Flex'

/**
 * Stack Component
 * 
 * Vertical or horizontal stack with consistent spacing
 * Shorthand for common flex patterns
 */
const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    spacing: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    spacing: 'md',
    align: 'stretch',
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /**
   * Render as a different HTML element
   * @default 'div'
   */
  as?: React.ElementType
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction,
      spacing,
      align,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align }), className)}
        {...props}
      />
    )
  }
)

Stack.displayName = 'Stack'

/**
 * Convenience components for common stack patterns
 */
export const VStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => <Stack ref={ref} direction="vertical" {...props} />)

VStack.displayName = 'VStack'

export const HStack = React.forwardRef<
  HTMLDivElement,
  Omit<StackProps, 'direction'>
>((props, ref) => <Stack ref={ref} direction="horizontal" {...props} />)

HStack.displayName = 'HStack'
