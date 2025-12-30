#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🏛️  TOKEN COMPLETENESS VALIDATION\n');

const errors = [];
const warnings = [];

// Load design tokens
const tokensPath = path.join(process.cwd(), 'src/design-tokens/tokens.json');

if (!fs.existsSync(tokensPath)) {
  errors.push('FATAL: tokens.json not found at ' + tokensPath);
  console.error('❌ ' + errors[0]);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Required token namespaces
const requiredNamespaces = [
  'color',
  'spacing',
  'typography',
  'breakpoint',
  'shadow',
  'radius',
  'transition'
];

// Validate namespace completeness
requiredNamespaces.forEach(namespace => {
  if (!tokens[namespace]) {
    errors.push(`Missing required token namespace: ${namespace}`);
  }
});

// Scan CSS files for hardcoded values
const scanDir = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(css|scss|tsx|ts)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check for hardcoded colors (hex, rgb, hsl)
      const colorRegex = /#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
      const hardcodedColors = content.match(colorRegex);

      if (hardcodedColors && !fullPath.includes('tokens.json')) {
        errors.push(`Hardcoded color in ${fullPath}: ${hardcodedColors.join(', ')}`);
      }

      // Check for hardcoded pixel values in non-token files
      const pxRegex = /(?<!var\([^)]*)(\d+)px(?![^(]*\))/g;
      const hardcodedPx = content.match(pxRegex);

      if (hardcodedPx && !fullPath.includes('tokens') && hardcodedPx.length > 3) {
        warnings.push(`Potential hardcoded spacing in ${fullPath}`);
      }
    }
  });
};

// Scan source directory
const srcPath = path.join(process.cwd(), 'src');
if (fs.existsSync(srcPath)) {
  scanDir(srcPath);
}

// Report results
console.log(`✓ Token namespaces validated`);
console.log(`✓ Hardcoded value scan complete\n`);

if (warnings.length > 0) {
  console.warn('⚠️  WARNINGS:\n');
  warnings.forEach(w => console.warn('  - ' + w));
  console.warn('');
}

if (errors.length > 0) {
  console.error('❌ CONSTITUTIONAL VIOLATIONS:\n');
  errors.forEach(e => console.error('  - ' + e));
  console.error('\n🚫 BUILD BLOCKED BY TOKEN ENFORCEMENT\n');
  process.exit(1);
}

console.log('✅ TOKEN VALIDATION PASSED\n');
process.exit(0);
