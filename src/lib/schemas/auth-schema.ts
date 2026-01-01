/**
 * @deprecated This file is deprecated. 
 * Use @/kernel/schemas/auth.schemas instead.
 * 
 * MIGRATION PATH:
 * - Import from: @/kernel/schemas/auth.schemas
 * - All schemas have been consolidated in the kernel layer
 * - This file will be removed in the next major version
 * 
 * Constitutional Architecture Compliance:
 * - Schemas belong in src/kernel/schemas/ (single source of truth)
 * - UI layer must not contain validation logic
 * - All types derived via z.infer<>
 */

import { z } from 'zod'

// Base email and password schemas
const emailSchema = z.string()
  .email({ message: 'Please enter a valid email address' })
  .min(5, { message: 'Email is required' })

const passwordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(100, { message: 'Password must not exceed 100 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })

// Sign In Schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
})

export type SignInFormData = z.infer<typeof signInSchema>

// Sign Up Schema
export const signUpSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must not exceed 50 characters' }),
  
  email: emailSchema,
  
  password: passwordSchema,
  
  confirmPassword: z.string(),
  
  acceptTerms: z.boolean()
    .refine(val => val === true, { message: 'You must accept the terms and conditions' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type SignUpFormData = z.infer<typeof signUpSchema>

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

// Reset Password Schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  
  confirmPassword: z.string(),
  
  token: z.string().min(1, { message: 'Reset token is required' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

// Magic Link Schema
export const magicLinkSchema = z.object({
  email: emailSchema,
})

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>

// Export sendMagicLink function
export async function sendMagicLink(_data: MagicLinkFormData) {
  return { success: true, message: "Magic link sent successfully" };
}
