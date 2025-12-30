#!/usr/bin/env tsx
/**
 * CANONSTRATA MOTION VALIDATOR
 * Only kernel-authorized motion allowed
 * Unauthorized imports cause build failure
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const MOTION_LIBRARIES = [
  'framer-motion',
  'react-spring',
  'gsap',
  'motion',
  'anime.js',
];

const KERNEL_MOTION_DIR = 'src/kernel/motion';
const SCAN_DIRECTORIES = ['src/app', 'src/components', 'src/lib'];

interface Violation {
  file: string;
  line: number;
  library: string;
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
  // Skip .storybook, node_modules, dist, etc.
  if (filePath.includes('.storybook') || filePath.includes('node_modules') || filePath.includes('dist')) {
    return;
  }
  
  // Only parse src/** files
  if (!filePath.includes('/src/')) {
    return;
  }
  
  // Kernel files are exempt
  if (filePath.includes(KERNEL_MOTION_DIR)) {
    return;
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    MOTION_LIBRARIES.forEach((lib) => {
      if (line.includes(`from '${lib}'`) || line.includes(`from "${lib}"`)) {
        violations.push({
          file: filePath,
          line: index + 1,
          library: lib,
        });
      }
    });
  });
}

// Execute validation
console.log('🔍 CANONSTRATA MOTION VALIDATOR');
console.log('━'.repeat(60));

for (const dir of SCAN_DIRECTORIES) {
  if (statSync(dir, { throwIfNoEntry: false })) {
    scanDirectory(dir);
  }
}

if (violations.length > 0) {
  console.error('\n❌ UNAUTHORIZED MOTION DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}`);
    console.error(`  Unauthorized import: ${v.library}`);
    console.error(`  Required: Import from ${KERNEL_MOTION_DIR} only\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata kernel-only motion policy enforced.');
  process.exit(1);
} else {
  console.log('✓ No unauthorized motion imports');
  console.log('✓ Motion governance invariant satisfied\n');
  process.exit(0);
}
