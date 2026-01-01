/**
 * MUTATION KERNEL - Newsletter Actions
 * 
 * All newsletter subscription mutations flow through Server Actions with:
 * - Zod validation (single source of truth)
 * - safeAction wrapper
 * - Type-safe results
 */

'use server';

import { newsletterSchema, type NewsletterInput } from '@/kernel/schemas/newsletter.schema';
import { safeAction, safeActionDirect } from './safe-action';

// Server Action for useFormState (FormData → ActionState)
export const subscribeNewsletterAction = safeAction(
  newsletterSchema,
  async (data: NewsletterInput) => {
    // TODO: Implement actual newsletter subscription logic
    // This could be:
    // - Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // - Save to database
    // - Send confirmation email
    
    console.log('Newsletter subscription:', data);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      subscribedAt: new Date().toISOString(),
      message: 'Thank you for subscribing to our newsletter!',
    };
  }
);

// Direct action for programmatic use
export const subscribeNewsletterDirect = safeActionDirect(
  newsletterSchema,
  async (data: NewsletterInput) => {
    console.log('Newsletter subscription (direct):', data);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
    };
  }
);
