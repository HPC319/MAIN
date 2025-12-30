#!/usr/bin/env node
/**
 * CONSTITUTIONAL ENFORCEMENT: TOKEN BYPASS ELIMINATION
 * 
 * Scans all source files for bracketed Tailwind literals.
 * Examples of BANNED patterns:
 *   - className="text-[#fff]"
 *   - className="w-[500px]"
 *   - className="bg-[rgb(255,0,0)]"
 * 
 * FAILURE MODE: Exit 1 with file/line/column location
 * ENFORCEMENT: Pre-commit + CI gate
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface Violation {
  file: string;
  line: number;
  column: number;
  match: string;
  context: string;
}

const TAILWIND_BRACKET_PATTERN = /className\s*=\s*["'`][^"'`]*\[[^\]]+\][^"'`]*["'`]/g;
const EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/out/**',
  '**/coverage/**',
];

function findViolations(filePath: string): Violation[] {
  const violations: Violation[] = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    const matches = line.matchAll(TAILWIND_BRACKET_PATTERN);
    
    for (const match of matches) {
      const column = match.index ?? 0;
      violations.push({
        file: filePath,
        line: lineIndex + 1,
        column: column + 1,
        match: match[0],
        context: line.trim(),
      });
    }
  });

  return violations;
}

async function scanRepository(rootPath: string): Promise<Violation[]> {
  const allViolations: Violation[] = [];
  
  const patterns = EXTENSIONS.map(ext => `**/*.${ext}`);
  
  for (const pattern of patterns) {
    const files = await glob(pattern, {
      cwd: rootPath,
      absolute: true,
      ignore: IGNORE_PATTERNS,
    });

    for (const file of files) {
      const violations = findViolations(file);
      allViolations.push(...violations);
    }
  }

  return allViolations;
}

function formatViolationReport(violations: Violation[]): string {
  let report = '\n';
  report += '═══════════════════════════════════════════════════════════\n';
  report += '  CONSTITUTIONAL VIOLATION: BRACKETED TAILWIND LITERALS\n';
  report += '═══════════════════════════════════════════════════════════\n\n';
  report += 'RULE: All styling tokens must be declared in constitutional\n';
  report += '      design system. Arbitrary values bypass governance.\n\n';
  report += `VIOLATIONS DETECTED: ${violations.length}\n\n`;

  violations.forEach((v, index) => {
    report += `[${index + 1}] ${path.relative(process.cwd(), v.file)}\n`;
    report += `    Line ${v.line}:${v.column}\n`;
    report += `    ${v.context}\n`;
    report += `    ${' '.repeat(v.column - 1)}^\n`;
    report += `    Illegal token: ${v.match}\n\n`;
  });

  report += '───────────────────────────────────────────────────────────\n';
  report += 'REMEDIATION:\n';
  report += '  1. Define tokens in tailwind.config.ts\n';
  report += '  2. Reference via semantic class names\n';
  report += '  3. Update constitutional design system documentation\n';
  report += '───────────────────────────────────────────────────────────\n';
  report += 'ENFORCEMENT STATUS: FAILED\n';
  report += '═══════════════════════════════════════════════════════════\n';

  return report;
}

async function main() {
  const rootPath = process.cwd();
  
  console.log('🔍 Scanning for bracketed Tailwind literals...');
  console.log(`📁 Root: ${rootPath}\n`);

  const violations = await scanRepository(rootPath);

  if (violations.length === 0) {
    console.log('✅ CONSTITUTIONAL COMPLIANCE: No bracketed Tailwind literals detected');
    console.log('   All styling tokens are constitutionally governed\n');
    process.exit(0);
  }

  const report = formatViolationReport(violations);
  console.error(report);
  process.exit(1);
}

main().catch((error) => {
  console.error('💀 VALIDATOR FAILURE:', error);
  process.exit(1);
});
