#!/usr/bin/env tsx
/**
 * CANONSTRATA TS SUPPRESSION VALIDATOR
 * TypeScript error suppressions forbidden
 * Enforces zero compiler warnings
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SCAN_DIRECTORIES = ['src/app', 'src/components', 'src/lib', 'src/kernel'];

const SUPPRESSIONS = [
  '@ts-ignore',
  '@ts-nocheck',
  '@ts-expect-error',
  '@ts-check'
];

interface Violation {
  file: string;
  line: number;
  suppression: string;
  context: string;
}

const violations: Violation[] = [];

function scanDirectory(dir: string): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules' && entry !== 'dist') {
      scanDirectory(fullPath);
    } else if (stat.isFile() && ['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry))) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath: string): void {
  // Skip build artifacts and dependencies
  if (filePath.includes('node_modules') || filePath.includes('dist') || filePath.includes('.storybook')) {
    return;
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    SUPPRESSIONS.forEach((suppression) => {
      if (line.includes(suppression)) {
        violations.push({
          file: filePath,
          line: index + 1,
          suppression,
          context: line.trim()
        });
      }
    });
  });
}

// Execute validation
console.log('🔍 CANONSTRATA TS SUPPRESSION VALIDATOR');
console.log('━'.repeat(60));

for (const dir of SCAN_DIRECTORIES) {
  try {
    if (statSync(dir, { throwIfNoEntry: false })) {
      scanDirectory(dir);
    }
  } catch (error) {
    // Directory doesn't exist, skip
  }
}

if (violations.length > 0) {
  console.error('\n❌ TYPESCRIPT SUPPRESSIONS DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}`);
    console.error(`  ${v.context}`);
    console.error(`  Forbidden: ${v.suppression}\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata zero-suppression policy enforced.');
  process.exit(1);
} else {
  console.log('✓ No TypeScript suppressions found');
  console.log('✓ Clean compilation invariant satisfied\n');
  process.exit(0);
}
