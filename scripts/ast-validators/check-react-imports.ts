#!/usr/bin/env tsx
/**
 * Standalone React Import Validator
 * Quick execution wrapper for CI/CD and local development
 */

import { scanDirectory } from './validate-react-imports';
import * as path from 'path';
import * as fs from 'fs';

const srcDir = path.join(process.cwd(), 'src');

if (!fs.existsSync(srcDir)) {
  console.error('Error: src directory not found');
  process.exit(1);
}

console.log('🔍 Scanning for React 19 import violations...\n');

const result = scanDirectory(srcDir);

if (result.violations.length > 0) {
  console.error(`\n❌ Found ${result.violations.length} violation(s)`);
  process.exit(1);
} else {
  console.log('\n✅ All imports are React 19 compliant!');
  process.exit(0);
}
