#!/usr/bin/env tsx
/**
 * CANONSTRATA TOKEN VALIDATOR
 * Enforces token-first design system
 * Build fails on hardcoded values
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { parse } from '@typescript-eslint/typescript-estree';

const HARDCODED_VALUE_PATTERNS = [
  /\b(#[0-9A-Fa-f]{3,8})\b/, // Hex colors
  /\b(\d+px)\b/, // Pixel values
  /\b(rgb\(|rgba\(|hsl\(|hsla\()/i, // Color functions
  /\b(\d+rem)\b/, // Rem values without token
];

const ALLOWED_DIRECTORIES = ['src/design-system/tokens', 'src/kernel'];
const SCAN_DIRECTORIES = ['src/app', 'src/components', 'src/lib'];

interface Violation {
  file: string;
  line: number;
  column: number;
  value: string;
  type: string;
}

const violations: Violation[] = [];

function scanDirectory(dir: string): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (stat.isFile() && ['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry))) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    HARDCODED_VALUE_PATTERNS.forEach((pattern) => {
      const match = pattern.exec(line);
      if (match) {
        // Check if it's in a token definition file
        const isTokenFile = ALLOWED_DIRECTORIES.some(dir => filePath.includes(dir));
        if (!isTokenFile) {
          violations.push({
            file: filePath,
            line: index + 1,
            column: match.index + 1,
            value: match[1],
            type: 'HARDCODED_VALUE',
          });
        }
      }
    });
  });
}

// Execute validation
console.log('🔍 CANONSTRATA TOKEN VALIDATOR');
console.log('━'.repeat(60));

for (const dir of SCAN_DIRECTORIES) {
  if (statSync(dir, { throwIfNoEntry: false })) {
    scanDirectory(dir);
  }
}

if (violations.length > 0) {
  console.error('\n❌ TOKEN INVARIANT VIOLATIONS DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}:${v.column}`);
    console.error(`  Hardcoded value: ${v.value}`);
    console.error(`  Required: Use design token from src/design-system/tokens\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata refuses to compile with hardcoded values.');
  process.exit(1);
} else {
  console.log('✓ All design values use tokens');
  console.log('✓ Token invariant satisfied\n');
  process.exit(0);
}
