/**
 * MUTATION KERNEL - Safe Action Wrapper
 * 
 * Wraps all Server Actions with:
 * - Server-side Zod validation
 * - Error handling
 * - Type-safe ActionState results
 */

'use server';

import { z, ZodSchema } from 'zod';

export type ActionState<TOutput = void> = {
  success: true;
  data: TOutput;
  message?: string;
  errors?: Record<string, string[]>;
} | {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  data?: TOutput;
};

export type ActionError = {
  message: string;
  field?: string;
  code?: string;
};

export function safeAction<TInput, TOutput>(
  schema: ZodSchema<TInput>,
  handler: (data: TInput) => Promise<TOutput>
) {
  return async (
    _prevState: ActionState<TOutput>,
    formData: FormData
  ): Promise<ActionState<TOutput>> => {
    try {
      const rawData: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        rawData[key] = value;
      }

      const validatedData = schema.parse(rawData);
      const result = await handler(validatedData);

      return {
        success: true,
        data: result,
        message: 'Action completed successfully',
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        });

        return {
          success: false,
          message: 'Validation failed',
          errors: fieldErrors,
        };
      }

      return {
        success: false,
        message: error instanceof Error ? error.message : 'Action failed',
      };
    }
  };
}

export function safeActionDirect<TInput, TOutput>(
  schema: ZodSchema<TInput>,
  handler: (data: TInput) => Promise<TOutput>
) {
  return async (data: TInput): Promise<TOutput> => {
    try {
      const validatedData = schema.parse(data);
      return await handler(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        const actionError: ActionError = {
          message: firstError?.message || 'Validation failed',
          field: firstError?.path.join('.') || undefined,
          code: firstError?.code || undefined,
        };
        throw actionError;
      }

      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Action failed');
    }
  };
}
