/**
 * Authentication Schemas - Single Source of Truth
 * All auth validation flows through Zod schemas
 * Constitutional Law: All schemas in kernel, no duplication
 */

import { z } from 'zod';

// Base validation schemas
const emailSchema = z.string()
  .email({ message: 'Please enter a valid email address' })
  .min(5, { message: 'Email is required' });

const passwordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(100, { message: 'Password must not exceed 100 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

// Sign In Schema
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

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
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, { message: 'Reset token is required' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Magic Link Schema
export const magicLinkSchema = z.object({
  email: emailSchema,
});

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>;

// Create User Schema
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().optional(),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

// Legacy aliases for compatibility
export const registerSchema = signUpSchema;
export const loginSchema = signInSchema;
export const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type RegisterInput = SignUpFormData;
export type LoginInput = SignInFormData;
export type ForgotPasswordInput = ForgotPasswordFormData;
export type ResetPasswordInput = ResetPasswordFormData;
export type VerifyTokenInput = z.infer<typeof verifyTokenSchema>;
