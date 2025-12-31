/**
 * Form Actions - Server Actions
 */

'use server'

export async function submitContactForm(formData: FormData) {
  // Placeholder implementation
  return { success: true }
}

export async function sendMagicLink(email: string) {
  // Placeholder implementation
  return { success: true }
}

export type MagicLinkFormData = {
  email: string
}

export const magicLinkSchema = {
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
