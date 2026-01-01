#!/usr/bin/env tsx
/**
 * Gatekeeper - Master Validation Suite
 * Enforces all constitutional architecture laws
 */

import { execSync } from 'child_process';

const checks = [
  { name: 'Boundary Enforcement', script: 'scripts/gatekeeper/boundary-check.ts' },
  { name: 'Motion Kernel Compliance', script: 'scripts/gatekeeper/motion-kernel-check.ts' },
  { name: 'Token Validation', script: 'scripts/ast-validators/validate-tokens.ts' },
  { name: 'Motion Validation', script: 'scripts/ast-validators/validate-motion.ts' },
  { name: 'React Imports', script: 'scripts/ast-validators/validate-react-imports.ts' },
];

let failed = 0;
let passed = 0;

console.log('🛡️  GATEKEEPER - Constitutional Architecture Enforcement\n');

checks.forEach(({ name, script }) => {
  console.log(`\n▶️  Running: ${name}`);
  console.log('─'.repeat(60));
  
  try {
    execSync(`tsx ${script}`, { stdio: 'inherit' });
    passed++;
  } catch (error) {
    failed++;
  }
});

console.log('\n' + '═'.repeat(60));
console.log('📊 GATEKEEPER RESULTS');
console.log('═'.repeat(60));
console.log(`✅ Passed: ${passed}/${checks.length}`);
console.log(`❌ Failed: ${failed}/${checks.length}`);

if (failed === 0) {
  console.log('\n🎉 All checks passed! Architecture is compliant.\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Some checks failed. Fix violations before merging.\n');
  process.exit(1);
}
