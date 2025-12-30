/**
 * CANONSTRATA MOTION VALIDATOR
 * Enforces motion governance at build time
 * Only kernel-authorized motion allowed
 */

import * as fs from 'fs';
import * as path from 'path';

interface MotionViolation {
  file: string;
  line: number;
  violation: string;
}

const UNAUTHORIZED_MOTION_IMPORTS = [
  'framer-motion',
  'react-spring',
  'gsap',
  'anime.js',
  'motion',
  'react-transition-group'
];

const KERNEL_AUTHORIZED_PATHS = [
  'design-system/motion',
  'src/lib/motion-kernel'
];

function isKernelAuthorized(filePath: string): boolean {
  return KERNEL_AUTHORIZED_PATHS.some(authorized => 
    filePath.includes(authorized)
  );
}

function validateMotionImports(): MotionViolation[] {
  const violations: MotionViolation[] = [];
  const srcPath = path.join(process.cwd(), 'src');

  if (!fs.existsSync(srcPath)) {
    return violations;
  }

  function scanFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Check for unauthorized motion library imports
      for (const lib of UNAUTHORIZED_MOTION_IMPORTS) {
        if (line.includes(`from '${lib}'`) || line.includes(`from "${lib}"`)) {
          if (!isKernelAuthorized(filePath)) {
            violations.push({
              file: filePath,
              line: index + 1,
              violation: `Unauthorized motion import: ${lib}`
            });
          }
        }
      }

      // Check for inline animations
      if (line.includes('animate(') && !isKernelAuthorized(filePath)) {
        violations.push({
          file: filePath,
          line: index + 1,
          violation: 'Unauthorized inline animation detected'
        });
      }

      // Check for CSS animations outside kernel
      if ((line.includes('@keyframes') || line.includes('animation:')) && 
          !isKernelAuthorized(filePath)) {
        violations.push({
          file: filePath,
          line: index + 1,
          violation: 'Unauthorized CSS animation outside motion kernel'
        });
      }
    });
  }

  function scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        scanFile(fullPath);
      }
    }
  }

  scanDirectory(srcPath);
  return violations;
}

function validateReducedMotionSupport(): MotionViolation[] {
  const violations: MotionViolation[] = [];
  const motionKernelPath = path.join(process.cwd(), 'src/lib/motion-kernel');

  if (!fs.existsSync(motionKernelPath)) {
    violations.push({
      file: 'src/lib/motion-kernel',
      line: 0,
      violation: 'Motion kernel directory not found - reduced-motion support mandatory'
    });
    return violations;
  }

  // Check for prefers-reduced-motion media query
  function scanForReducedMotion(dir: string): boolean {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasReducedMotion = false;

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        hasReducedMotion = scanForReducedMotion(fullPath) || hasReducedMotion;
      } else if (entry.isFile() && /\.(tsx?|jsx?|css)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('prefers-reduced-motion')) {
          hasReducedMotion = true;
        }
      }
    }

    return hasReducedMotion;
  }

  if (!scanForReducedMotion(motionKernelPath)) {
    violations.push({
      file: motionKernelPath,
      line: 0,
      violation: 'Motion kernel must implement prefers-reduced-motion support'
    });
  }

  return violations;
}

function main(): void {
  console.log('🔒 CANONSTRATA MOTION GOVERNANCE');
  console.log('=================================\n');

  const importViolations = validateMotionImports();
  const reducedMotionViolations = validateReducedMotionSupport();

  const allViolations = [...importViolations, ...reducedMotionViolations];

  if (allViolations.length > 0) {
    console.error('❌ MOTION GOVERNANCE VIOLATIONS:\n');
    allViolations.forEach(v => {
      console.error(`   ${v.file}:${v.line}`);
      console.error(`   → ${v.violation}\n`);
    });
    console.error('BUILD REFUSED\n');
    process.exit(1);
  }

  console.log('✅ MOTION GOVERNANCE PASSED\n');
  process.exit(0);
}

main();
