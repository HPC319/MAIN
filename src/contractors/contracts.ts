/**
 * ISOLATION ZONE - CONTRACT INTERFACES
 * 
 * Defines the contract interfaces that all contractors must implement.
 * These contracts are the ONLY way the system interacts with contractors.
 */

import { Result } from '@/core/types';

export interface ContractorConfig {
  readonly name: string;
  readonly version: string;
  readonly enabled: boolean;
}

export interface AnalyticsContractor {
  readonly config: ContractorConfig;
  track(event: string, properties?: Record<string, unknown>): Promise<Result<void>>;
  identify(userId: string, traits?: Record<string, unknown>): Promise<Result<void>>;
  page(name: string, properties?: Record<string, unknown>): Promise<Result<void>>;
}

export interface PaymentContractor {
  readonly config: ContractorConfig;
  createPaymentIntent(amount: number, currency: string): Promise<Result<{ clientSecret: string }>>;
  confirmPayment(paymentIntentId: string): Promise<Result<{ status: string }>>;
  refund(paymentIntentId: string, amount?: number): Promise<Result<void>>;
}

export interface EmailContractor {
  readonly config: ContractorConfig;
  send(to: string, subject: string, body: string): Promise<Result<void>>;
  sendTemplate(to: string, templateId: string, data: Record<string, unknown>): Promise<Result<void>>;
}

export interface StorageContractor {
  readonly config: ContractorConfig;
  upload(file: Buffer, path: string): Promise<Result<{ url: string }>>;
  delete(path: string): Promise<Result<void>>;
  getSignedUrl(path: string, expiresIn: number): Promise<Result<{ url: string }>>;
}
