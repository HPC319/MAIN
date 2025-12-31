#!/usr/bin/env tsx
/**
 * AST Validator: React Import Governance
 * 
 * MISSION: Enforce React 19 import compliance across the codebase
 * 
 * DETECTION RULES:
 * - ILLEGAL: import React from "react"
 * - LEGAL: import { useState } from "react"
 * - LEGAL: import type { FC, ReactNode } from "react"
 * 
 * VALIDATION LOGIC:
 * 1. Scan all .tsx/.ts files in src/
 * 2. Detect "import React from 'react'" pattern
 * 3. Check if React namespace is actually used (React.FC, React.memo, etc.)
 * 4. Report violations with file paths and line numbers
 * 5. Exit 1 if violations found, 0 if clean
 * 
 * ENFORCEMENT GATE: This script is integrated into CI/CD pipelines
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

interface Violation {
  file: string;
  line: number;
  column: number;
  importStatement: string;
  usesReactNamespace: boolean;
  reactUsages: string[];
}

interface ScanResult {
  totalFiles: number;
  scannedFiles: number;
  violations: Violation[];
  errors: Array<{ file: string; error: string }>;
}

/**
 * Recursively find all TypeScript/TSX files in a directory
 */
function findTsFiles(dir: string, fileList: string[] = []): string[] {
  // Skip node_modules, .next, and other build directories
  const skipDirs = ['node_modules', '.next', 'dist', 'build', 'out', '.git', 'coverage', 'storybook-static'];
  
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip blacklisted directories
      if (!skipDirs.includes(file)) {
        findTsFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check if the file contains React namespace usage (React.FC, React.memo, etc.)
 */
function detectReactNamespaceUsage(ast: any): string[] {
  const reactUsages: string[] = [];

  traverse(ast, {
    MemberExpression(path: any) {
      // Detect React.Something patterns
      if (
        path.node.object.type === 'Identifier' &&
        path.node.object.name === 'React'
      ) {
        const propertyName = path.node.property.name || path.node.property.value;
        if (propertyName) {
          const usage = `React.${propertyName}`;
          if (!reactUsages.includes(usage)) {
            reactUsages.push(usage);
          }
        }
      }
    },
    TSQualifiedName(path: any) {
      // Detect React.FC in type annotations
      if (
        path.node.left.type === 'Identifier' &&
        path.node.left.name === 'React'
      ) {
        const rightName = path.node.right.name;
        if (rightName) {
          const usage = `React.${rightName}`;
          if (!reactUsages.includes(usage)) {
            reactUsages.push(usage);
          }
        }
      }
    },
  });

  return reactUsages;
}

/**
 * Validate a single file for React import violations
 */
function validateFile(filePath: string): Violation | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Quick regex check first to avoid parsing files without React imports
    const hasDefaultReactImport = /import\s+React\s+from\s+['"]react['"]/.test(content);
    
    if (!hasDefaultReactImport) {
      return null; // No violation, skip parsing
    }

    // Parse the file into an AST
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true,
    });

    // Detect React namespace usage
    const reactUsages = detectReactNamespaceUsage(ast);

    // Find the import statement
    let violation: Violation | null = null;

    traverse(ast, {
      ImportDeclaration(path: any) {
        if (path.node.source.value === 'react') {
          // Check for default import (import React from 'react')
          const hasDefaultImport = path.node.specifiers.some(
            (spec: any) => spec.type === 'ImportDefaultSpecifier' && spec.local.name === 'React'
          );

          if (hasDefaultImport) {
            const loc = path.node.loc;
            violation = {
              file: filePath,
              line: loc?.start.line || 0,
              column: loc?.start.column || 0,
              importStatement: content.substring(path.node.start, path.node.end),
              usesReactNamespace: reactUsages.length > 0,
              reactUsages,
            };
          }
        }
      },
    });

    return violation;
  } catch (error: any) {
    // Silent error handling - some files might have syntax errors
    console.error(`${colors.yellow}[WARN]${colors.reset} Failed to parse ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Scan all files in the src directory
 */
function scanDirectory(srcDir: string): ScanResult {
  const files = findTsFiles(srcDir);
  const result: ScanResult = {
    totalFiles: files.length,
    scannedFiles: 0,
    violations: [],
    errors: [],
  };

  console.log(`${colors.cyan}[SCAN]${colors.reset} Found ${colors.bold}${files.length}${colors.reset} TypeScript files to analyze...`);
  console.log('');

  for (const file of files) {
    result.scannedFiles++;
    
    // Progress indicator every 50 files
    if (result.scannedFiles % 50 === 0) {
      process.stdout.write(`${colors.blue}[PROGRESS]${colors.reset} Scanned ${result.scannedFiles}/${files.length} files...\r`);
    }

    try {
      const violation = validateFile(file);
      if (violation) {
        result.violations.push(violation);
      }
    } catch (error: any) {
      result.errors.push({
        file,
        error: error.message,
      });
    }
  }

  // Clear progress line
  process.stdout.write('\r' + ' '.repeat(80) + '\r');

  return result;
}

/**
 * Format and display violations
 */
function reportViolations(result: ScanResult): void {
  console.log('');
  console.log(`${colors.bold}${colors.cyan}╔════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}║          REACT 19 IMPORT GOVERNANCE - VALIDATION REPORT       ║${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  console.log(`${colors.bold}Files Scanned:${colors.reset} ${result.scannedFiles}/${result.totalFiles}`);
  console.log(`${colors.bold}Violations Found:${colors.reset} ${result.violations.length}`);
  console.log('');

  if (result.violations.length === 0) {
    console.log(`${colors.green}${colors.bold}✓ SUCCESS${colors.reset} - No React import violations detected!`);
    console.log(`${colors.green}All imports comply with React 19 standards.${colors.reset}`);
    console.log('');
    return;
  }

  console.log(`${colors.red}${colors.bold}✗ VIOLATIONS DETECTED${colors.reset}`);
  console.log('');

  // Group violations by type
  const withNamespace = result.violations.filter(v => v.usesReactNamespace);
  const withoutNamespace = result.violations.filter(v => !v.usesReactNamespace);

  if (withoutNamespace.length > 0) {
    console.log(`${colors.red}${colors.bold}Type 1: Unnecessary Default Imports (${withoutNamespace.length})${colors.reset}`);
    console.log(`${colors.yellow}  ⚠ These imports should be REMOVED completely${colors.reset}`);
    console.log('');

    withoutNamespace.forEach((violation, index) => {
      const relativePath = path.relative(process.cwd(), violation.file);
      console.log(`  ${colors.bold}${index + 1}.${colors.reset} ${colors.cyan}${relativePath}${colors.reset}:${violation.line}:${violation.column}`);
      console.log(`     ${colors.red}Found:${colors.reset} ${violation.importStatement}`);
      console.log(`     ${colors.green}Action:${colors.reset} DELETE this line (React namespace not used)`);
      console.log('');
    });
  }

  if (withNamespace.length > 0) {
    console.log(`${colors.red}${colors.bold}Type 2: Should Use Type Imports (${withNamespace.length})${colors.reset}`);
    console.log(`${colors.yellow}  ⚠ These imports should be converted to specific type imports${colors.reset}`);
    console.log('');

    withNamespace.forEach((violation, index) => {
      const relativePath = path.relative(process.cwd(), violation.file);
      console.log(`  ${colors.bold}${index + 1}.${colors.reset} ${colors.cyan}${relativePath}${colors.reset}:${violation.line}:${violation.column}`);
      console.log(`     ${colors.red}Found:${colors.reset} ${violation.importStatement}`);
      console.log(`     ${colors.yellow}Uses:${colors.reset} ${violation.reactUsages.join(', ')}`);
      
      // Generate suggested replacement
      const typeImports = new Set<string>();
      violation.reactUsages.forEach(usage => {
        const typeName = usage.replace('React.', '');
        typeImports.add(typeName);
      });
      
      const suggestion = `import type { ${Array.from(typeImports).join(', ')} } from "react";`;
      console.log(`     ${colors.green}Replace with:${colors.reset} ${suggestion}`);
      console.log('');
    });
  }

  console.log(`${colors.red}${colors.bold}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.red}${colors.bold}ENFORCEMENT ACTION REQUIRED${colors.reset}`);
  console.log('');
  console.log(`${colors.yellow}To fix these violations:${colors.reset}`);
  console.log(`  1. Run the batch processor (Phase 2 of the orchestration)`);
  console.log(`  2. Or manually update each file according to the actions above`);
  console.log('');
  console.log(`${colors.red}${colors.bold}Build will FAIL until all violations are resolved.${colors.reset}`);
  console.log('');
}

/**
 * Main execution function
 */
function main(): void {
  const startTime = Date.now();

  console.log('');
  console.log(`${colors.bold}${colors.magenta}╔════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}║      REACT 19 IMPORT GOVERNANCE - AST VALIDATION ENGINE       ║${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}╚════════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  // Determine source directory
  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error(`${colors.red}[ERROR]${colors.reset} Source directory not found: ${srcDir}`);
    process.exit(1);
  }

  console.log(`${colors.blue}[CONFIG]${colors.reset} Source Directory: ${srcDir}`);
  console.log(`${colors.blue}[CONFIG]${colors.reset} Enforcement Level: ${colors.bold}ZERO TOLERANCE${colors.reset}`);
  console.log('');

  // Scan the directory
  const result = scanDirectory(srcDir);

  // Report results
  reportViolations(result);

  // Show execution time
  const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`${colors.blue}[STATS]${colors.reset} Execution Time: ${executionTime}s`);
  console.log('');

  // Exit with appropriate code
  if (result.violations.length > 0) {
    console.log(`${colors.red}${colors.bold}EXIT CODE: 1 (VIOLATIONS DETECTED)${colors.reset}`);
    console.log('');
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}EXIT CODE: 0 (CLEAN)${colors.reset}`);
    console.log('');
    process.exit(0);
  }
}

// Execute if run directly
if (require.main === module) {
  main();
}

export { validateFile, scanDirectory, type Violation, type ScanResult };
