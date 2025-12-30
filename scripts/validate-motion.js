#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🏛️  MOTION GOVERNANCE ENFORCEMENT\n');

const errors = [];
const warnings = [];

// Allowed motion sources
const MOTION_KERNEL = 'src/kernel/motion';

// Scan for unauthorized motion imports
const scanForMotion = (dir, basePath = '') => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      scanForMotion(fullPath, relativePath);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Skip kernel files
      if (fullPath.includes(MOTION_KERNEL)) {
        return;
      }

      // Check for unauthorized animation libraries
      const forbiddenImports = [
        'framer-motion',
        'react-spring',
        'gsap',
        'anime.js',
        'velocity-animate'
      ];

      forbiddenImports.forEach(lib => {
        const importRegex = new RegExp(`from ['"]${lib}['"]`, 'g');
        if (importRegex.test(content)) {
          errors.push(`Unauthorized motion library in ${relativePath}: ${lib}`);
        }
      });

      // Check for @keyframes outside kernel
      if (/@keyframes/.test(content) && !fullPath.includes('tokens') && !fullPath.includes(MOTION_KERNEL)) {
        warnings.push(`Direct @keyframes in ${relativePath} - should use kernel motion`);
      }

      // Check for transition/animation CSS properties
      const motionProps = /(animation|transition)\s*:/g;
      if (motionProps.test(content) && !fullPath.includes('tokens') && !fullPath.includes(MOTION_KERNEL)) {
        warnings.push(`Direct motion CSS in ${relativePath} - should use tokens`);
      }
    }
  });
};

// Check for prefers-reduced-motion support
const checkReducedMotionSupport = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let hasSupport = false;

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      if (checkReducedMotionSupport(fullPath)) {
        hasSupport = true;
      }
    } else if (entry.isFile() && /\.(css|scss|tsx?|jsx?)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (/prefers-reduced-motion/.test(content)) {
        hasSupport = true;
      }
    }
  });

  return hasSupport;
};

// Scan source
const srcPath = path.join(process.cwd(), 'src');
if (fs.existsSync(srcPath)) {
  scanForMotion(srcPath);

  const hasReducedMotion = checkReducedMotionSupport(srcPath);
  if (!hasReducedMotion) {
    errors.push('Missing prefers-reduced-motion support - WCAG 2.3.3 violation');
  } else {
    console.log('✓ prefers-reduced-motion support detected');
  }
}

// Report results
console.log(`✓ Motion import scan complete\n`);

if (warnings.length > 0) {
  console.warn('⚠️  WARNINGS:\n');
  warnings.forEach(w => console.warn('  - ' + w));
  console.warn('');
}

if (errors.length > 0) {
  console.error('❌ MOTION GOVERNANCE VIOLATIONS:\n');
  errors.forEach(e => console.error('  - ' + e));
  console.error('\n🚫 BUILD BLOCKED BY MOTION KERNEL\n');
  process.exit(1);
}

console.log('✅ MOTION GOVERNANCE PASSED\n');
process.exit(0);
