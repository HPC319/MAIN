'use server';

import { z } from 'zod';
// // import bcrypt from 'bcryptjs';
// // import prisma from '@/core/database/client';
// // import { sendEmail } from '@/core/email/client';
import { safeAction } from './safe-action';

// Stubs for missing dependencies
const prisma: any = null;
const bcrypt: any = null;
const sendEmail: any = null;


// Re-export for direct action use
const safeActionDirect = safeAction;

// Registration schema
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const register = safeActionDirect(
  registerSchema,
  async ({ name, email, password }) => {
    const formattedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: formattedEmail,
        password: hashedPassword,
      },
    });

    // Prisma returns proper typed object with id
    return { userId: user.id };
  }
);

export const forgotPassword = safeActionDirect(
  z.object({ email: z.string().email() }),
  async ({ email }) => {
    const formattedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: formattedEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = Math.random().toString(36).substring(2, 15);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    await sendEmail({
      to: formattedEmail,
      subject: 'Password Reset',
      text: `Reset token: ${resetToken}`,
    });

    return { success: true };
  }
);

export const verifyResetToken = safeActionDirect(
  z.object({ token: z.string() }),
  async ({ token }) => {
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

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { valid: true };
  }
);

export const updatePassword = safeActionDirect(
  z.object({
    token: z.string(),
    password: z.string().min(8),
  }),
  async ({ token, password }) => {
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

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      success: true,
      email: user.email,
    };
  }
);
