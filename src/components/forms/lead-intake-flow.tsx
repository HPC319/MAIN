/**
 * Lead Intake Flow
 * 3-step form: contact info → preferences → confirmation
 */

'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MultiStepForm } from './multi-step-form'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FormSuccess } from '@/components/ui/form-success'
import { FormError } from '@/components/ui/form-error'

// Step 1: Contact Information
const contactInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number').optional().or(z.literal('')),
  company: z.string().optional(),
})

// Step 2: Preferences
const preferencesSchema = z.object({
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Combined schema
const leadIntakeSchema = contactInfoSchema.merge(preferencesSchema)

type LeadIntakeData = z.infer<typeof leadIntakeSchema>

const STEPS = [
  { id: 'contact', title: 'Contact Info', description: 'Your details' },
  { id: 'preferences', title: 'Preferences', description: 'Your needs' },
  { id: 'confirmation', title: 'Confirm', description: 'Review & submit' },
]

const SERVICES = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Digital Marketing',
  'SEO Services',
  'Consulting',
]

const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
]

const TIMELINES = [
  'ASAP',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Flexible',
]

export function LeadIntakeFlow() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('')
  const [selectedServices, setSelectedServices] = React.useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    trigger,
  } = useForm<LeadIntakeData>({
    resolver: zodResolver(leadIntakeSchema),
    mode: 'onChange',
  })

  const handleStepChange = async (newStep: number) => {
    // Validate current step before moving forward
    if (newStep > currentStep) {
      const fieldsToValidate = currentStep === 0 
        ? ['name', 'email', 'phone', 'company'] 
        : ['services', 'budget', 'timeline', 'message']
      
      const isStepValid = await trigger(fieldsToValidate as any)
      if (!isStepValid) return
    }
    
    setCurrentStep(newStep)
  }

  const onSubmit = async (data: LeadIntakeData) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      // TODO: Implement actual submission logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Lead intake submission:', data)
      
      setSubmitSuccess(true)
      setCurrentStep(2) // Move to confirmation
    } catch (error) {
      setSubmitError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const canGoNext = currentStep === 0 
    ? !errors.name && !errors.email 
    : currentStep === 1 
    ? selectedServices.length > 0 && !errors.budget && !errors.timeline && !errors.message
    : true

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Get Started</h2>
        <p className="text-muted-foreground">Tell us about your project</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MultiStepForm
          steps={STEPS}
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          canGoNext={canGoNext}
          submitLabel="Submit Inquiry"
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <FormField label="Full Name" htmlFor="name" error={errors.name?.message} required>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="John Doe"
                />
              </FormField>

              <FormField label="Email Address" htmlFor="email" error={errors.email?.message} required>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                />
              </FormField>

              <FormField label="Phone Number" htmlFor="phone" error={errors.phone?.message}>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="+1 (555) 123-4567"
                />
              </FormField>

              <FormField label="Company" htmlFor="company">
                <Input
                  id="company"
                  {...register('company')}
                  placeholder="Your Company Ltd."
                />
              </FormField>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Services Needed *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICES.map(service => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => handleServiceToggle(service)}
                      />
                      <label
                        htmlFor={service}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.services && (
                  <p className="text-sm text-destructive">{errors.services.message}</p>
                )}
              </div>

              <FormField label="Budget Range" htmlFor="budget" error={errors.budget?.message} required>
                <select
                  id="budget"
                  {...register('budget')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select budget range</option>
                  {BUDGET_RANGES.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Timeline" htmlFor="timeline" error={errors.timeline?.message} required>
                <select
                  id="timeline"
                  {...register('timeline')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select timeline</option>
                  {TIMELINES.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Project Details" htmlFor="message" error={errors.message?.message} required>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </FormField>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {submitSuccess ? (
                <FormSuccess message="Thank you! We've received your inquiry and will be in touch soon." />
              ) : (
                <>
                  <div className="rounded-lg border p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Review Your Information</h3>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{getValues('name')}</span>
                        
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{getValues('email')}</span>
                        
                        {getValues('phone') && (
                          <>
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="font-medium">{getValues('phone')}</span>
                          </>
                        )}
                        
                        {getValues('company') && (
                          <>
                            <span className="text-muted-foreground">Company:</span>
                            <span className="font-medium">{getValues('company')}</span>
                          </>
                        )}
                        
                        <span className="text-muted-foreground">Services:</span>
                        <span className="font-medium">{selectedServices.join(', ')}</span>
                        
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{getValues('budget')}</span>
                        
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{getValues('timeline')}</span>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-muted-foreground text-sm">Message:</span>
                        <p className="text-sm mt-1">{getValues('message')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {submitError && <FormError message={submitError} />}
                </>
              )}
            </div>
          )}
        </MultiStepForm>
      </form>
    </div>
  )
}
