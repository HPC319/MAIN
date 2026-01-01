/**
 * Authentication Surface Layer
 * Constitutional Law: Framework abstraction - no direct NextAuth imports in UI
 * 
 * This layer provides a clean abstraction over NextAuth, isolating framework
 * dependencies and providing a stable interface for components.
 */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/auth';
import type { Session } from 'next-auth';

/**
 * Server-side: Get current user session
 * Use in Server Components and Server Actions
 */
export async function getCurrentUser(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error('Error fetching user session:', error);
    return null;
  }
}

/**
 * Server-side: Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentUser();
  return !!session?.user;
}

/**
 * Server-side: Get user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getCurrentUser();
  return session?.user?.id || null;
}

/**
 * Client-side hook wrapper (re-export for convenience)
 * Usage in Client Components:
 * 
 * import { useAuthSession } from '@/lib/auth/surface';
 * const { data: session, status } = useAuthSession();
 */
export { useSession as useAuthSession } from 'next-auth/react';

/**
 * Client-side sign out wrapper
 * Usage in Client Components:
 * 
 * import { signOutUser } from '@/lib/auth/surface';
 * await signOutUser();
 */
export { signOut as signOutUser } from 'next-auth/react';

/**
 * Client-side sign in wrapper
 */
export { signIn as signInUser } from 'next-auth/react';

/**
 * Type exports for session data
 */
export type { Session } from 'next-auth';
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
