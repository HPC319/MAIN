/**
 * MUTATION KERNEL - Authentication Actions
 * 
 * All auth mutations flow through Server Actions with:
 * - Zod validation (single source of truth)
 * - safeAction wrapper
 * - Type-safe results
 */

'use server';

import { prisma } from '@/utils/prismaDB';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { 
  registerSchema, 
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyTokenSchema,
  type RegisterInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type VerifyTokenInput,
} from '@/kernel/schemas/auth.schemas';
import { safeActionDirect } from './safe-action';

export const registerUser = safeActionDirect(
  registerSchema,
  async (data: RegisterInput) => {
    const { name, email, password } = data;
    const formattedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: formattedEmail,
        password: hashedPassword,
      },
    });

    return { userId: user.id };
  }
);

export const forgotPassword = safeActionDirect(
  forgotPasswordSchema,
  async (data: ForgotPasswordInput) => {
    const { email } = data;
    const formattedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (!user) {
      return { message: 'If email exists, reset link will be sent' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { email: formattedEmail },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    try {
      console.log(`Password reset token for ${formattedEmail}: ${resetToken}`);
    } catch (error) {
      console.error('Failed to send reset email:', error);
      throw new Error('Failed to send reset email');
    }

    return { message: 'Password reset email sent' };
  }
);

export const resetPassword = safeActionDirect(
  resetPasswordSchema,
  async (data: ResetPasswordInput) => {
    const { token, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password reset successful' };
  }
);

export const verifyToken = safeActionDirect(
  verifyTokenSchema,
  async (data: VerifyTokenInput) => {
    const { token } = data;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    return { 
      valid: true,
      email: user.email,
    };
  }
);
