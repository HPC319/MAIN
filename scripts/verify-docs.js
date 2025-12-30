#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🏛️  DOCUMENTATION TRUTH VERIFICATION\n');

const errors = [];

// Check README constitutional compliance
const readmePath = path.join(process.cwd(), 'README.md');

if (!fs.existsSync(readmePath)) {
  errors.push('FATAL: README.md missing');
} else {
  const readme = fs.readFileSync(readmePath, 'utf8');

  // Forbidden terms
  const forbidden = [
    /template/i,
    /starter/i,
    /boilerplate/i,
    /kit/i,
    /playground/i,
    /scaffold/i
  ];

  forbidden.forEach(pattern => {
    if (pattern.test(readme)) {
      errors.push(`README contains forbidden term: ${pattern.source}`);
    }
  });

  // Required constitutional elements
  const required = [
    'CanonStrata',
    'constitutional',
    'load-bearing',
    'invariant',
    'enforcement'
  ];

  required.forEach(term => {
    if (!readme.includes(term)) {
      errors.push(`README missing required constitutional term: ${term}`);
    }
  });

  console.log('✓ README constitutional compliance checked');
}

// Verify package.json scripts
const packagePath = path.join(process.cwd(), 'package.json');

if (!fs.existsSync(packagePath)) {
  errors.push('FATAL: package.json missing');
} else {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  const requiredScripts = [
    'validate:tokens',
    'validate:motion',
    'test:invariants',
    'verify:docs'
  ];

  requiredScripts.forEach(script => {
    if (!pkg.scripts || !pkg.scripts[script]) {
      errors.push(`Missing required npm script: ${script}`);
    }
  });

  console.log('✓ Package.json scripts validated');
}

// Report results
console.log('');

if (errors.length > 0) {
  console.error('❌ DOCUMENTATION VIOLATIONS:\n');
  errors.forEach(e => console.error('  - ' + e));
  console.error('\n🚫 BUILD BLOCKED BY DOCUMENTATION ENFORCEMENT\n');
  process.exit(1);
}

console.log('✅ DOCUMENTATION VERIFICATION PASSED\n');
process.exit(0);
