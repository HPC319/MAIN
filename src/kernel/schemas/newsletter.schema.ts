/**
 * MUTATION KERNEL - Newsletter Schemas
 * Single Source of Truth for newsletter subscription validation
 */

import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is required')
    .max(255, 'Email is too long'),
});

// Type exports (derived from schemas)
export type NewsletterInput = z.infer<typeof newsletterSchema>;
