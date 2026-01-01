/**
 * KERNEL LAYER - CONSTANTS
 * System-wide immutable constants
 */

export const SYSTEM_VERSION = '2.2.2' as const;

export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const API_ROUTES = {
  BASE: '/api',
  AUTH: '/api/auth',
  USERS: '/api/users',
} as const;
