/**
 * CANONSTRATA TOKEN VALIDATOR
 * Enforces token completeness at build time
 * VIOLATION = BUILD FAILS
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_TOKEN_CATEGORIES = [
  'colors',
  'spacing',
  'typography',
  'breakpoints',
  'shadows',
  'borders',
  'radii',
  'transitions'
] as const;

const TOKEN_PATH = path.join(process.cwd(), 'design-system/tokens');

function validateTokenStructure(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Check if token directory exists
  if (!fs.existsSync(TOKEN_PATH)) {
    result.valid = false;
    result.errors.push('CANONSTRATA VIOLATION: Token directory not found at design-system/tokens');
    return result;
  }

  // Validate each required category
  for (const category of REQUIRED_TOKEN_CATEGORIES) {
    const categoryPath = path.join(TOKEN_PATH, `${category}.ts`);
    
    if (!fs.existsSync(categoryPath)) {
      result.valid = false;
      result.errors.push(`CANONSTRATA VIOLATION: Missing required token category: ${category}`);
      continue;
    }

    // Read and validate file content
    const content = fs.readFileSync(categoryPath, 'utf-8');
    
    // Check for hardcoded values (simple regex check)
    const hardcodedPatterns = [
      /:\s*['"]#[0-9a-fA-F]{3,8}['"]/g,  // Hex colors
      /:\s*['"]rgb\(/g,                   // RGB colors
      /:\s*\d+px['"]/g,                   // Pixel values
    ];

    for (const pattern of hardcodedPatterns) {
      if (pattern.test(content)) {
        result.warnings.push(`CANONSTRATA WARNING: Potential hardcoded value in ${category}.ts`);
      }
    }

    // Ensure export exists
    if (!content.includes('export')) {
      result.valid = false;
      result.errors.push(`CANONSTRATA VIOLATION: ${category}.ts must export token definitions`);
    }
  }

  return result;
}

function validateNoHardcodedStyles(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  const srcPath = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcPath)) {
    return result;
  }

  function scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf-8');

        // Check for style prop usage
        if (/style=\{/.test(content)) {
          result.valid = false;
          result.errors.push(`CANONSTRATA VIOLATION: Inline style detected in ${fullPath}`);
        }

        // Check for hardcoded colors
        if (/#[0-9a-fA-F]{3,8}['"`]/.test(content)) {
          result.valid = false;
          result.errors.push(`CANONSTRATA VIOLATION: Hardcoded color value in ${fullPath}`);
        }
      }
    }
  }

  scanDirectory(srcPath);

  return result;
}

function main(): void {
  console.log('🔒 CANONSTRATA TOKEN ENFORCEMENT');
  console.log('================================\n');

  const tokenValidation = validateTokenStructure();
  const styleValidation = validateNoHardcodedStyles();

  // Report token validation
  if (tokenValidation.errors.length > 0) {
    console.error('❌ TOKEN STRUCTURE VIOLATIONS:');
    tokenValidation.errors.forEach(err => console.error(`   ${err}`));
    console.error('');
  }

  if (tokenValidation.warnings.length > 0) {
    console.warn('⚠️  TOKEN WARNINGS:');
    tokenValidation.warnings.forEach(warn => console.warn(`   ${warn}`));
    console.warn('');
  }

  // Report style validation
  if (styleValidation.errors.length > 0) {
    console.error('❌ HARDCODED STYLE VIOLATIONS:');
    styleValidation.errors.forEach(err => console.error(`   ${err}`));
    console.error('');
  }

  const allValid = tokenValidation.valid && styleValidation.valid;

  if (allValid) {
    console.log('✅ TOKEN ENFORCEMENT PASSED\n');
    process.exit(0);
  } else {
    console.error('❌ TOKEN ENFORCEMENT FAILED');
    console.error('BUILD REFUSED\n');
    process.exit(1);
  }
}

main();
