#!/usr/bin/env tsx
/**
 * CANONSTRATA ANY TYPE VALIDATOR
 * Explicit 'any' types forbidden
 * Enforces strict type safety
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import * as ts from 'typescript';

const SCAN_DIRECTORIES = ['src/app', 'src/components', 'src/lib', 'src/kernel'];

interface Violation {
  file: string;
  line: number;
  column: number;
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
    } else if (stat.isFile() && ['.ts', '.tsx'].includes(extname(entry))) {
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
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  function visit(node: ts.Node): void {
    // Check for explicit 'any' type keyword
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      const lineText = content.split("\n")[line]?.trim() ?? "";
      
      violations.push({
        file: filePath,
        line: line + 1,
        column: character + 1,
        context: lineText
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

// Execute validation
console.log('🔍 CANONSTRATA ANY TYPE VALIDATOR');
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
  console.error('\n❌ EXPLICIT ANY TYPES DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}:${v.column}`);
    console.error(`  ${v.context}`);
    console.error(`  Forbidden: Explicit 'any' type\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata strict typing policy enforced.');
  process.exit(1);
} else {
  console.log('✓ No explicit any types found');
  console.log('✓ Type safety invariant satisfied\n');
  process.exit(0);
}
