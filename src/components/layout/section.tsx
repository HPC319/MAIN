/**
 * Section Layout Component
 * 
 * Semantic section wrapper with consistent vertical spacing
 * Provides visual rhythm through vertical padding
 */

'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: 'py-0',
      xs: 'py-8',
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
      '2xl': 'py-40',
    },
    background: {
      transparent: 'bg-transparent',
      default: 'bg-background',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    spacing: 'md',
    background: 'transparent',
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Render as a different HTML element
   * @default 'section'
   */
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'main'
  
  /**
   * Whether to include a Container wrapper
   * @default false
   */
  contained?: boolean
  
  /**
   * Container size if contained is true
   */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose'
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing,
      background,
      as: Component = 'section',
      contained = false,
      containerSize = 'xl',
      children,
      ...props
    },
    ref
  ) => {
    const content = children

    return (
      <Component
        ref={ref as React.Ref<HTMLElement & HTMLDivElement>}
        className={cn(sectionVariants({ spacing, background }), className)}
        {...props}
      >
        {contained ? (
          <div className={cn('mx-auto w-full px-6', {
            'max-w-screen-sm': containerSize === 'sm',
            'max-w-screen-md': containerSize === 'md',
            'max-w-screen-lg': containerSize === 'lg',
            'max-w-screen-xl': containerSize === 'xl',
            'max-w-screen-2xl': containerSize === '2xl',
            'max-w-full': containerSize === 'full',
            'max-w-prose': containerSize === 'prose',
          })}>
            {content}
          </div>
        ) : (
          content
        )}
      </Component>
    )
  }
)

Section.displayName = 'Section'
