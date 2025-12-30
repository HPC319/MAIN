/**
 * Form Error Component
 * Display error messages in forms
 */

'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) return null

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          'flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive',
          className
        )}
        {...props}
      >
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
      </div>
    )
  }
)

FormError.displayName = 'FormError'
