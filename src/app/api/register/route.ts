/**
 * DEPRECATED - USE SERVER ACTIONS
 * 
 * This API route is deprecated in favor of Server Actions.
 * New code should use: src/kernel/actions/auth.actions.ts -> registerUser
 * 
 * Migration: This route will be removed in the next major version.
 */

import { NextResponse } from 'next/server';

export async function POST(request: Request | undefined) {
  return NextResponse.json(
    {
      error: 'DEPRECATED: Use Server Action registerUser from @/kernel/actions/auth.actions',
      migrationPath: 'src/kernel/actions/auth.actions.ts',
    },
    { status: 410 } // 410 Gone
  );
}
