/**
 * KERNEL LAYER - CONFIGURATION
 * System configuration management
 */

import { SystemConfig } from '../core/types';

export function getSystemConfig(): SystemConfig {
  return {
    environment: (process.env.NODE_ENV as any) || 'development',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '2.2.2',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  };
}
