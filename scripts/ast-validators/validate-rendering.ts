#!/usr/bin/env tsx
/**
 * CANONSTRATA RENDERING VALIDATOR
 * Enforces Server Components by default
 * Client Components only when required
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const SCAN_DIRECTORIES = ['src/app', 'src/components'];
const CLIENT_ONLY_PATTERNS = [
  /useState/,
  /useEffect/,
  /useContext/,
  /useReducer/,
  /useCallback/,
  /useMemo/,
  /useRef/,
  /useLayoutEffect/,
  /onClick/,
  /onChange/,
  /onSubmit/,
];

interface Violation {
  file: string;
  line: number;
  pattern: string;
  reason: string;
}

const violations: Violation[] = [];

function scanDirectory(dir: string): void {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
      scanDirectory(fullPath);
    } else if (stat.isFile() && ['.tsx', '.jsx'].includes(extname(entry))) {
      validateFile(fullPath);
    }
  }
}

function validateFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const hasUseClientDirective = lines.some(line => 
    line.trim() === "'use client'" || line.trim() === '"use client"'
  );

  if (hasUseClientDirective) {
    return; // Client component - properly marked
  }

  lines.forEach((line, index) => {
    CLIENT_ONLY_PATTERNS.forEach((pattern) => {
      if (pattern.test(line)) {
        violations.push({
          file: filePath,
          line: index + 1,
          pattern: pattern.source,
          reason: 'Client-only feature used without "use client" directive',
        });
      }
    });
  });
}

// Execute validation
console.log('🔍 CANONSTRATA RENDERING VALIDATOR');
console.log('━'.repeat(60));

for (const dir of SCAN_DIRECTORIES) {
  if (statSync(dir, { throwIfNoEntry: false })) {
    scanDirectory(dir);
  }
}

if (violations.length > 0) {
  console.error('\n❌ RENDERING CONTRACT VIOLATIONS DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}`);
    console.error(`  Pattern: ${v.pattern}`);
    console.error(`  Issue: ${v.reason}`);
    console.error(`  Required: Add "use client" directive or refactor to Server Component\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata enforces Server Components by default.');
  process.exit(1);
} else {
  console.log('✓ All components properly marked');
  console.log('✓ Rendering contract satisfied\n');
  process.exit(0);
}
