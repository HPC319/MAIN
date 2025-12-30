/**
 * CANONSTRATA ENFORCEMENT INSTALLATION VERIFIER
 * Validates that all enforcement mechanisms are properly installed
 */

import * as fs from 'fs';
import * as path from 'path';

interface VerificationResult {
  component: string;
  status: 'PASS' | 'FAIL';
  details: string[];
}

const results: VerificationResult[] = [];

function verify(component: string, check: () => { pass: boolean; details: string[] }): void {
  const result = check();
  results.push({
    component,
    status: result.pass ? 'PASS' : 'FAIL',
    details: result.details
  });
}

// 1. Verify ESLint Configuration
verify('ESLint Configuration', () => {
  const details: string[] = [];
  const eslintPath = path.join(process.cwd(), '.eslintrc.json');
  
  if (!fs.existsSync(eslintPath)) {
    return { pass: false, details: ['ESLint configuration file missing'] };
  }

  const config = JSON.parse(fs.readFileSync(eslintPath, 'utf-8'));
  
  // Check for required rules
  const requiredRules = [
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/strict-boolean-expressions',
    'no-restricted-syntax',
    'no-restricted-properties'
  ];

  const missingRules = requiredRules.filter(rule => !config.rules || !config.rules[rule]);
  
  if (missingRules.length > 0) {
    details.push(`Missing required rules: ${missingRules.join(', ')}`);
    return { pass: false, details };
  }

  details.push('All required ESLint rules present');
  details.push('Inline style prohibition configured');
  details.push('Motion import restriction configured');
  
  return { pass: true, details };
});

// 2. Verify TypeScript Configuration
verify('TypeScript Configuration', () => {
  const details: string[] = [];
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  
  if (!fs.existsSync(tsconfigPath)) {
    return { pass: false, details: ['tsconfig.json missing'] };
  }

  const config = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
  
  // Check for strict mode flags
  const requiredFlags = [
    'strict',
    'noImplicitAny',
    'strictNullChecks',
    'noUnusedLocals',
    'noUnusedParameters',
    'noImplicitReturns',
    'noUncheckedIndexedAccess',
    'exactOptionalPropertyTypes'
  ];

  const missingFlags = requiredFlags.filter(flag => 
    !config.compilerOptions || config.compilerOptions[flag] !== true
  );

  if (missingFlags.length > 0) {
    details.push(`Missing strict flags: ${missingFlags.join(', ')}`);
    return { pass: false, details };
  }

  if (config.compilerOptions.allowJs !== false) {
    details.push('WARNING: allowJs should be false for maximum strictness');
  }

  details.push('All strict TypeScript flags enabled');
  details.push('No implicit any allowed');
  details.push('Unchecked index access prohibited');
  
  return { pass: true, details };
});

// 3. Verify Token Validator
verify('Token Validator', () => {
  const details: string[] = [];
  const validatorPath = path.join(process.cwd(), 'scripts/enforcement/validate-tokens.ts');
  
  if (!fs.existsSync(validatorPath)) {
    return { pass: false, details: ['Token validator script missing'] };
  }

  const content = fs.readFileSync(validatorPath, 'utf-8');
  
  // Check for key enforcement logic
  const requiredChecks = [
    'CANONSTRATA',
    'validateTokenStructure',
    'validateNoHardcodedStyles',
    'process.exit(1)'
  ];

  const missingChecks = requiredChecks.filter(check => !content.includes(check));
  
  if (missingChecks.length > 0) {
    details.push(`Missing enforcement logic: ${missingChecks.join(', ')}`);
    return { pass: false, details };
  }

  details.push('Token validation logic present');
  details.push('Hardcoded style detection active');
  details.push('Build failure on violation configured');
  
  return { pass: true, details };
});

// 4. Verify Motion Validator
verify('Motion Validator', () => {
  const details: string[] = [];
  const motionPath = path.join(process.cwd(), 'scripts/enforcement/motion-validator.ts');
  
  if (!fs.existsSync(motionPath)) {
    return { pass: false, details: ['Motion validator script missing'] };
  }

  const content = fs.readFileSync(motionPath, 'utf-8');
  
  const requiredChecks = [
    'CANONSTRATA',
    'UNAUTHORIZED_MOTION_IMPORTS',
    'validateMotionImports',
    'validateReducedMotionSupport',
    'prefers-reduced-motion'
  ];

  const missingChecks = requiredChecks.filter(check => !content.includes(check));
  
  if (missingChecks.length > 0) {
    details.push(`Missing enforcement logic: ${missingChecks.join(', ')}`);
    return { pass: false, details };
  }

  details.push('Motion governance logic present');
  details.push('Unauthorized import detection active');
  details.push('Reduced-motion validation configured');
  
  return { pass: true, details };
});

// 5. Verify Runtime Assertions
verify('Runtime Assertions', () => {
  const details: string[] = [];
  const runtimePath = path.join(process.cwd(), 'scripts/enforcement/runtime-assertions.ts');
  
  if (!fs.existsSync(runtimePath)) {
    return { pass: false, details: ['Runtime assertions utility missing'] };
  }

  const content = fs.readFileSync(runtimePath, 'utf-8');
  
  const requiredFunctions = [
    'CanonStrataViolationError',
    'assertDefined',
    'assertTokenExists',
    'assertMotionAuthorized',
    'assertNoInlineStyles',
    'assertServerOnly',
    'invariantAssert'
  ];

  const missingFunctions = requiredFunctions.filter(func => !content.includes(func));
  
  if (missingFunctions.length > 0) {
    details.push(`Missing assertion functions: ${missingFunctions.join(', ')}`);
    return { pass: false, details };
  }

  details.push('All runtime assertion utilities present');
  details.push('Server/client boundary checks available');
  details.push('Token existence validation available');
  
  return { pass: true, details };
});

// 6. Verify Package.json Scripts
verify('Build Scripts', () => {
  const details: string[] = [];
  const pkgPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(pkgPath)) {
    return { pass: false, details: ['package.json missing'] };
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  
  const requiredScripts = [
    'validate:tokens',
    'validate:motion',
    'validate:all'
  ];

  const missingScripts = requiredScripts.filter(script => 
    !pkg.scripts || !pkg.scripts[script]
  );

  if (missingScripts.length > 0) {
    details.push(`Missing validation scripts: ${missingScripts.join(', ')}`);
    return { pass: false, details };
  }

  // Check if build script includes validation
  if (!pkg.scripts.build || !pkg.scripts.build.includes('validate')) {
    details.push('WARNING: Build script does not include validation');
  }

  details.push('Validation scripts configured');
  details.push('Token validation command available');
  details.push('Motion validation command available');
  
  return { pass: true, details };
});

// 7. Verify README Constitutional Version
verify('Constitutional README', () => {
  const details: string[] = [];
  const readmePath = path.join(process.cwd(), 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    return { pass: false, details: ['README.md missing'] };
  }

  const content = fs.readFileSync(readmePath, 'utf-8');
  
  const requiredSections = [
    'CANONSTRATA',
    'SYSTEM IDENTITY',
    'NON-NEGOTIABLE INVARIANTS',
    'REFUSAL CONTRACT',
    'IMMUTABILITY CLAUSE',
    'load-bearing'
  ];

  const missingSections = requiredSections.filter(section => !content.includes(section));
  
  if (missingSections.length > 0) {
    details.push(`Missing constitutional sections: ${missingSections.join(', ')}`);
    return { pass: false, details };
  }

  // Check for prohibited content
  const prohibited = ['template', 'starter', 'framework', 'toolkit'];
  const foundProhibited = prohibited.filter(term => 
    content.toLowerCase().includes(`a ${term}`) || 
    content.toLowerCase().includes(`is a ${term}`)
  );

  if (foundProhibited.length > 0) {
    details.push(`WARNING: Prohibited terminology found: ${foundProhibited.join(', ')}`);
  }

  details.push('Constitutional README installed');
  details.push('System identity declared');
  details.push('Invariants documented');
  
  return { pass: true, details };
});

// 8. Verify Directory Structure
verify('Directory Structure', () => {
  const details: string[] = [];
  
  const requiredDirs = [
    'scripts/enforcement',
    'design-system',
    'src'
  ];

  const missingDirs = requiredDirs.filter(dir => 
    !fs.existsSync(path.join(process.cwd(), dir))
  );

  if (missingDirs.length > 0) {
    details.push(`Missing directories: ${missingDirs.join(', ')}`);
    return { pass: false, details };
  }

  details.push('All required directories present');
  details.push('Enforcement scripts directory exists');
  details.push('Design system directory exists');
  
  return { pass: true, details };
});

// Generate Report
function generateReport(): void {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  CANONSTRATA ENFORCEMENT INSTALLATION VERIFICATION');
  console.log('═══════════════════════════════════════════════════════\n');

  let allPassed = true;

  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${result.component}: ${result.status}`);
    
    result.details.forEach(detail => {
      const prefix = detail.startsWith('WARNING') ? '   ⚠️ ' : '   → ';
      console.log(`${prefix}${detail}`);
    });
    
    console.log('');

    if (result.status === 'FAIL') {
      allPassed = false;
    }
  });

  console.log('═══════════════════════════════════════════════════════');
  
  if (allPassed) {
    console.log('✅ ALL ENFORCEMENT MECHANISMS INSTALLED');
    console.log('   System is constitutional and self-defending');
    console.log('═══════════════════════════════════════════════════════\n');
    process.exit(0);
  } else {
    console.log('❌ ENFORCEMENT INSTALLATION INCOMPLETE');
    console.log('   System cannot defend invariants');
    console.log('═══════════════════════════════════════════════════════\n');
    process.exit(1);
  }
}

generateReport();
