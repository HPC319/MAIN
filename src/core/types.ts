/**
 * KERNEL LAYER - BASE TYPES
 * Type definitions for the entire system
 */

export interface SystemConfig {
  readonly environment: 'development' | 'production' | 'test';
  readonly version: string;
  readonly apiBaseUrl: string;
}

export interface Result<T, E = Error> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: E;
}

export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends object ? Immutable<T[K]> : T[K];
};
