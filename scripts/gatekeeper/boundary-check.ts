#!/usr/bin/env tsx
/**
 * Boundary Check - Gatekeeper Script
 * Enforces Substrate architectural boundaries
 * 
 * RULES:
 * - Core cannot import Next.js, React, framer-motion
 * - Contractors cannot import kernel or core
 * - UI cannot import core directly (must go through kernel)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

interface Violation {
  file: string;
  line: number;
  import: string;
  rule: string;
}

const violations: Violation[] = [];
const srcDir = join(process.cwd(), 'src');

// Forbidden imports for each layer
const boundaries = {
  'src/core': [
    'next/',
    'react',
    'framer-motion',
    'next-auth',
    'cookies()',
    'headers()',
  ],
  'src/contractors': [
    '@/kernel/',
    '@/core/',
    '../kernel',
    '../core',
  ],
  'src/components': [
    '@/core/',
    '../core',
  ],
  'src/app': [
    '@/core/',
    '../core',
  ],
};

function scanFile(filePath: string, layer: string, forbidden: string[]) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for imports
    if (line.includes('import') || line.includes('require')) {
      forbidden.forEach((forbiddenImport) => {
        if (line.includes(forbiddenImport)) {
          violations.push({
            file: relative(srcDir, filePath),
            line: index + 1,
            import: forbiddenImport,
            rule: `${layer} cannot import ${forbiddenImport}`,
          });
        }
      });
    }
  });
}

function scanDirectory(dir: string, layer: string, forbidden: string[]) {
  const entries = readdirSync(dir);

  entries.forEach((entry) => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (entry !== 'node_modules' && entry !== '.next') {
        scanDirectory(fullPath, layer, forbidden);
      }
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      scanFile(fullPath, layer, forbidden);
    }
  });
}

// Run checks for each boundary
Object.entries(boundaries).forEach(([layer, forbidden]) => {
  const layerPath = join(process.cwd(), layer);
  try {
    scanDirectory(layerPath, layer, forbidden);
  } catch (error) {
    // Layer might not exist yet
    console.log(`⚠️  Layer ${layer} not found, skipping...`);
  }
});

// Report results
if (violations.length === 0) {
  console.log('✅ Boundary check passed: All architectural boundaries enforced');
  process.exit(0);
} else {
  console.error(`❌ Boundary check failed: ${violations.length} violation(s) found\n`);
  
  violations.forEach((v) => {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    ⚠️  ${v.rule}`);
    console.error(`    Import: ${v.import}\n`);
  });
  
  process.exit(1);
}
