/**
 * Form Success Component
 * Display success messages in forms
 */

'use client'

import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export interface FormSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const FormSuccess = React.forwardRef<HTMLDivElement, FormSuccessProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) return null

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'flex items-start gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400',
          className
        )}
        {...props}
      >
        <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
      </div>
    )
  }
)

FormSuccess.displayName = 'FormSuccess'
