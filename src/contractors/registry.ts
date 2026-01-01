/**
 * ISOLATION ZONE - CONTRACTOR REGISTRY
 * 
 * Central registry for all contractors. This is the ONLY place
 * where contractors are instantiated and configured.
 */

import { AnalyticsContractor, EmailContractor } from './contracts';

class ContractorRegistry {
  private contractors = new Map<string, any>();
  
  register<T>(name: string, contractor: T): void {
    if (this.contractors.has(name)) {
      throw new Error(`Contractor ${name} already registered`);
    }
    this.contractors.set(name, contractor);
  }
  
  get<T>(name: string): T | undefined {
    return this.contractors.get(name) as T;
  }
  
  has(name: string): boolean {
    return this.contractors.has(name);
  }
  
  clear(): void {
    this.contractors.clear();
  }
}

export const registry = new ContractorRegistry();

export function getAnalyticsContractor(): AnalyticsContractor | undefined {
  return registry.get<AnalyticsContractor>('analytics');
}

export function getEmailContractor(): EmailContractor | undefined {
  return registry.get<EmailContractor>('email');
}
