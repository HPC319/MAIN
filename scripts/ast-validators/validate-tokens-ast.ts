#!/usr/bin/env tsx
/**
 * CANONSTRATA TOKEN VALIDATOR (AST)
 * Enhanced AST-based detection of hardcoded design tokens
 * Detects hex colors, pixel values, rem values, color functions
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import * as ts from 'typescript';

const SCAN_DIRECTORIES = ['src/app', 'src/components', 'src/lib'];

interface Violation {
  file: string;
  line: number;
  column: number;
  value: string;
  type: string;
}

const violations: Violation[] = [];

// Patterns for hardcoded tokens
const HEX_COLOR_PATTERN = /#[0-9a-fA-F]{3,8}\b/;
const PIXEL_PATTERN = /\b\d+px\b/;
const REM_PATTERN = /\b\d+(\.\d+)?rem\b/;
const COLOR_FUNCTION_PATTERN = /\b(rgb|rgba|hsl|hsla)\s*\(/;

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

function checkStringForTokens(text: string, file: string, line: number, column: number): void {
  const patterns = [
    { pattern: HEX_COLOR_PATTERN, type: 'hex color' },
    { pattern: PIXEL_PATTERN, type: 'pixel value' },
    { pattern: REM_PATTERN, type: 'rem value' },
    { pattern: COLOR_FUNCTION_PATTERN, type: 'color function' }
  ];

  patterns.forEach(({ pattern, type }) => {
    const match = text.match(pattern);
    if (match) {
      violations.push({
        file,
        line,
        column,
        value: match[0],
        type
      });
    }
  });
}

function validateFile(filePath: string): void {
  // Skip kernel files, build artifacts, and dependencies
  if (
    filePath.includes('src/kernel') ||
    filePath.includes('node_modules') ||
    filePath.includes('dist') ||
    filePath.includes('.storybook')
  ) {
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
    // Check string literals
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      checkStringForTokens(node.text, filePath, line + 1, character + 1);
    }

    // Check template expressions
    if (ts.isTemplateExpression(node)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      const text = node.getText(sourceFile);
      checkStringForTokens(text, filePath, line + 1, character + 1);
    }

    // Check JSX attribute values
    if (ts.isJsxAttribute(node) && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.initializer.getStart());
        checkStringForTokens(node.initializer.text, filePath, line + 1, character + 1);
      } else if (ts.isJsxExpression(node.initializer) && node.initializer.expression) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.initializer.getStart());
        const text = node.initializer.expression.getText(sourceFile);
        checkStringForTokens(text, filePath, line + 1, character + 1);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

// Execute validation
console.log('🔍 CANONSTRATA TOKEN VALIDATOR (AST)');
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
  console.error('\n❌ HARDCODED DESIGN TOKENS DETECTED\n');
  violations.forEach(v => {
    console.error(`${v.file}:${v.line}:${v.column}`);
    console.error(`  Hardcoded ${v.type}: ${v.value}`);
    console.error(`  Required: Use design system tokens\n`);
  });
  console.error(`Total violations: ${violations.length}`);
  console.error('\n⚖️  CanonStrata token governance enforced.');
  process.exit(1);
} else {
  console.log('✓ No hardcoded design tokens found');
  console.log('✓ Token system invariant satisfied\n');
  process.exit(0);
}
