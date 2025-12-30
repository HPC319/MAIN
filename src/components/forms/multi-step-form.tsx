/**
 * Multi-Step Form Component
 * Reusable stepper UI with step navigation
 */

'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

export interface Step {
  id: string
  title: string
  description?: string
}

export interface MultiStepFormProps {
  steps: Step[]
  currentStep: number
  onStepChange: (step: number) => void
  children: React.ReactNode
  onSubmit: () => void
  onBack?: () => void
  isSubmitting?: boolean
  canGoNext?: boolean
  canGoBack?: boolean
  submitLabel?: string
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  children,
  onSubmit,
  onBack,
  isSubmitting = false,
  canGoNext = true,
  canGoBack = true,
  submitLabel = 'Submit',
}: MultiStepFormProps) {
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (!isLastStep && canGoNext) {
      onStepChange(currentStep + 1)
    } else if (isLastStep) {
      onSubmit()
    }
  }

  const handleBack = () => {
    if (!isFirstStep && canGoBack) {
      if (onBack) {
        onBack()
      } else {
        onStepChange(currentStep - 1)
      }
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* Stepper */}
      <nav aria-label="Progress" className="w-full">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            
            return (
              <li
                key={step.id}
                className={cn(
                  'flex flex-1 items-center',
                  index !== steps.length - 1 && 'pr-4'
                )}
              >
                <div className="flex flex-col items-center flex-1">
                  <button
                    type="button"
                    onClick={() => onStepChange(index)}
                    disabled={index > currentStep}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                      isCompleted && 'border-primary bg-primary text-primary-foreground',
                      isCurrent && 'border-primary text-primary',
                      !isCompleted && !isCurrent && 'border-muted-foreground/30 text-muted-foreground',
                      index <= currentStep && 'cursor-pointer hover:border-primary',
                      index > currentStep && 'cursor-not-allowed'
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </button>
                  
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        isCurrent && 'text-primary',
                        !isCurrent && 'text-muted-foreground'
                      )}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 mx-4 transition-colors',
                      isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Content */}
      <div className="min-h-[300px]">
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep || !canGoBack || isSubmitting}
        >
          Back
        </Button>
        
        <Button
          type="button"
          onClick={handleNext}
          disabled={(!canGoNext && !isLastStep) || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processing...
            </>
          ) : isLastStep ? (
            submitLabel
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  )
}
