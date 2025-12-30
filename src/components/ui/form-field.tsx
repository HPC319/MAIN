/**
 * Form Field Component
 * Wrapper component for form inputs with label and error display
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'
import { Label } from '@/components/ui/label'

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  error?: string | undefined
  required?: boolean
  description?: string
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, htmlFor, error, required, description, children, ...props }, ref) => {
    const fieldId = htmlFor || React.useId()
    const errorId = `${fieldId}-error`
    const descriptionId = `${fieldId}-description`

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label htmlFor={fieldId} className={cn(error && 'text-destructive')}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        <div
          aria-describedby={cn(
            description && descriptionId,
            error && errorId
          )}
        >
          {children}
        </div>
        
        {error && (
          <p
            id={errorId}
            className="text-sm font-medium text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'
