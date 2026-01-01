#!/usr/bin/env tsx
/**
 * Motion Kernel Check - Gatekeeper Script
 * Ensures all motion flows through Motion Kernel exclusively
 * 
 * RULES:
 * - No framer-motion imports outside Motion Kernel
 * - No inline motion configs (transition, animate, variants)
 * - All motion via intent-based API
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

interface Violation {
  file: string;
  line: number;
  violation: string;
  type: 'import' | 'inline-config';
}

const violations: Violation[] = [];
const srcDir = join(process.cwd(), 'src');
const motionKernelPath = join(srcDir, 'lib', 'motion-kernel');

function scanFile(filePath: string) {
  // Skip Motion Kernel itself
  if (filePath.startsWith(motionKernelPath)) {
    return;
  }

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for framer-motion imports
    if (line.includes('from') && line.includes('framer-motion')) {
      violations.push({
        file: relative(srcDir, filePath),
        line: index + 1,
        violation: 'Direct framer-motion import outside Motion Kernel',
        type: 'import',
      });
    }

    // Check for inline motion configs
    const inlinePatterns = [
      /transition\s*=\s*\{/,
      /animate\s*=\s*\{/,
      /variants\s*=\s*\{/,
      /initial\s*=\s*\{/,
      /exit\s*=\s*\{/,
    ];

    inlinePatterns.forEach((pattern) => {
      if (pattern.test(line)) {
        violations.push({
          file: relative(srcDir, filePath),
          line: index + 1,
          violation: 'Inline motion config detected',
          type: 'inline-config',
        });
      }
    });
  });
}

function scanDirectory(dir: string) {
  const entries = readdirSync(dir);

  entries.forEach((entry) => {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (entry !== 'node_modules' && entry !== '.next') {
        scanDirectory(fullPath);
      }
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      scanFile(fullPath);
    }
  });
}

// Scan src directory
scanDirectory(srcDir);

// Report results
if (violations.length === 0) {
  console.log('✅ Motion Kernel check passed: All motion flows through Motion Kernel');
  process.exit(0);
} else {
  console.error(`❌ Motion Kernel check failed: ${violations.length} violation(s) found\n`);
  
  const importViolations = violations.filter((v) => v.type === 'import');
  const inlineViolations = violations.filter((v) => v.type === 'inline-config');
  
  if (importViolations.length > 0) {
    console.error('Direct framer-motion imports:');
    importViolations.forEach((v) => {
      console.error(`  ${v.file}:${v.line} - ${v.violation}`);
    });
    console.error('');
  }
  
  if (inlineViolations.length > 0) {
    console.error('Inline motion configs:');
    inlineViolations.forEach((v) => {
      console.error(`  ${v.file}:${v.line} - ${v.violation}`);
    });
    console.error('');
  }
  
  console.error('Fix: Use MotionBlock/MotionText/MotionImage with intent prop');
  console.error('Allowed intents: ENTRY_SOFT, EXIT_HARD, DRAWER, RIPPLE, HOVER_SHAPE, FLOAT, GRID_ENTRY, HOVER_CARD, HOVER_BUTTON, PULSE, INFINITE_LOOP, REDUCED\n');
  
  process.exit(1);
}
