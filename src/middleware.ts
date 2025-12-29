import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function extractTenantId(hostname: string): string {
  if (hostname.includes('.')) {
    const subdomain = hostname.split('.')[0];
    if (subdomain && subdomain !== 'www') {
      return subdomain;
    }
  }
  return process.env.DEFAULT_TENANT ?? 'default';
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const tenantId = extractTenantId(hostname);

  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenantId);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/health).*)'],
};
