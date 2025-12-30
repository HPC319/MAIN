/**
 * CANONSTRATA TOKEN VALIDATION
 * Compile-time and runtime token completeness checks
 */

import { assertToken } from './runtime-assertions';

export interface TokenValidationResult {
  valid: boolean;
  violations: string[];
  missing: string[];
}

/**
 * Validate token system completeness
 */
export function validateTokenSystem(tokens: Record<string, unknown>): TokenValidationResult {
  const violations: string[] = [];
  const missing: string[] = [];
  
  const requiredCategories = [
    'colors',
    'spacing',
    'typography',
    'breakpoints',
    'shadows',
    'radii'
  ];
  
  for (const category of requiredCategories) {
    if (!(category in tokens)) {
      missing.push(category);
    }
  }
  
  // Check for hardcoded values in token definitions
  function scanForHardcoded(obj: any, path: string = ''): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        scanForHardcoded(value, currentPath);
      } else if (typeof value === 'string') {
        try {
          assertToken(value, currentPath);
        } catch (e) {
          if (e instanceof Error) {
            violations.push(`${currentPath}: ${e.message}`);
          }
        }
      }
    }
  }
  
  if (typeof tokens === 'object' && tokens !== null) {
    scanForHardcoded(tokens);
  }
  
  return {
    valid: violations.length === 0 && missing.length === 0,
    violations,
    missing
  };
}

/**
 * Build-time token gate - fails build if tokens incomplete
 */
export function enforceTokenCompleteness(tokens: Record<string, unknown>): void {
  const result = validateTokenSystem(tokens);
  
  if (!result.valid) {
    const errors: string[] = [];
    
    if (result.missing.length > 0) {
      errors.push(`Missing token categories: ${result.missing.join(', ')}`);
    }
    
    if (result.violations.length > 0) {
      errors.push('Token violations detected:');
      errors.push(...result.violations);
    }
    
    throw new Error(
      `CANONSTRATA BUILD FAILURE - TOKEN GATES:\n${errors.join('\n')}`
    );
  }
}
