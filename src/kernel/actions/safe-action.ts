import { z, ZodSchema } from 'zod';

/**
 * MUTATION KERNEL - Safe Action Wrapper
 * Constitutional Law: All mutations must flow through validated actions
 */

export type ActionSuccess<T> = {
  success: true;
  data: T;
};

export type ActionError = {
  message: string;
  field?: string;
  code?: string;
};

export type ActionResult<T> = ActionSuccess<T> | { success: false; error: ActionError };

/**
 * Wraps server actions with Zod validation
 * Enforces: Input validation, error handling, type safety
 */
export function safeAction<TInput, TOutput>(
  schema: ZodSchema<TInput>,
  handler: (data: TInput) => Promise<TOutput>
) {
  return async (data: unknown): Promise<ActionResult<TOutput>> => {
    try {
      const validatedData = schema.parse(data);
      const result = await handler(validatedData);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        const actionError: ActionError = {
          message: firstError?.message || 'Validation failed',
          ...(firstError?.path.length ? { field: firstError.path.join('.') } : {}),
          ...(firstError?.code ? { code: firstError.code } : {}),
        };
        return { success: false, error: actionError };
      }
      
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      };
    }
  };
}
