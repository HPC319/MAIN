/**
 * Contact Form Schema
 * Constitutional Law: Single source of truth in kernel
 */

import { z } from 'zod';

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
});

export type ContactFormData = z.infer<typeof contactSchema>;
