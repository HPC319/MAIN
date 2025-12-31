import { z } from "zod";

export const magicLinkSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>;

export async function sendMagicLink(data: MagicLinkFormData) {
  // Implementation
  return { success: true, message: "Magic link sent successfully" };
}

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export async function createUser(data: CreateUserData) {
  // Implementation
  return { success: true, message: "User created successfully" };
}

export async function requestPasswordReset(email: string) {
  // Implementation
  return { success: true, message: "Password reset email sent" };
}

export const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function submitContactForm(data: ContactFormData) {
  // Implementation
  return { success: true, message: "Contact form submitted successfully" };
}

export async function forgotPasswordAction(data: { email: string }) {
  return requestPasswordReset(data.email);
}

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export async function signUpAction(data: SignUpData) {
  return createUser(data);
}
