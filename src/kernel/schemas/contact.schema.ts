/**
 * MUTATION KERNEL - Contact Schemas
 * Single Source of Truth for contact form validation
 */

import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is required'),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

// Type exports (derived from schemas)
export type ContactInput = z.infer<typeof contactSchema>;
