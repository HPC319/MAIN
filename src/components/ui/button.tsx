/**
 * Button Component
 * 
 * Accessible button component with multiple variants using CVA and Radix Slot
 * Supports all button types and full keyboard navigation
 * Includes interaction contracts for hover, focus, and press states
 */

'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'
import { hoverStates } from '@/design-system/interaction-contracts/hover'
import { focusStates } from '@/design-system/interaction-contracts/focus'
import { pressStates } from '@/design-system/interaction-contracts/press'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'ring-offset-background transition-all duration-200',
    // Focus contract
    focusStates.visible,
    // Press contract
    pressStates.scale,
    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-primary text-primary-foreground',
          hoverStates.scale,
          'hover:bg-primary/90',
        ].join(' '),
        destructive: [
          'bg-destructive text-destructive-foreground',
          hoverStates.scale,
          'hover:bg-destructive/90',
        ].join(' '),
        outline: [
          'border border-input bg-background',
          hoverStates.lift,
          'hover:bg-accent hover:text-accent-foreground',
        ].join(' '),
        secondary: [
          'bg-secondary text-secondary-foreground',
          hoverStates.brighten,
          'hover:bg-secondary/80',
        ].join(' '),
        ghost: [
          hoverStates.fadeIn,
          'hover:bg-accent hover:text-accent-foreground',
        ].join(' '),
        link: [
          'text-primary underline-offset-4',
          hoverStates.underline,
          'hover:underline',
        ].join(' '),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
