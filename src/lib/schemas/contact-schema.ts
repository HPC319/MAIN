/**
 * @deprecated This file is deprecated.
 * Use @/kernel/schemas/contact.schema instead.
 * 
 * MIGRATION PATH:
 * - Import from: @/kernel/schemas/contact.schema
 * - All schemas have been consolidated in the kernel layer
 * - This file will be removed in the next major version
 * 
 * Constitutional Architecture Compliance:
 * - Schemas belong in src/kernel/schemas/ (single source of truth)
 * - UI layer must not contain validation logic
 * - All types derived via z.infer<>
 */

import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .min(5, { message: 'Email is required' }),
  
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must not exceed 1000 characters' }),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, { message: 'Please enter a valid phone number' })
    .optional()
    .or(z.literal('')),
})

export type ContactFormData = z.infer<typeof contactSchema>
