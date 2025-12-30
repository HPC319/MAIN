#!/usr/bin/env tsx
/**
 * Artifact Cleanup Script
 * Removes generated artifacts and contamination
 */

import * as fs from 'fs';
import * as path from 'path';

const ARTIFACT_PATTERNS = [
  /\.backup$/,
  /\.temp$/,
  /\.tmp$/,
  /^AUDIT_.*\.md$/,
  /^COMPREHENSIVE_.*\.md$/,
  /^STATUS_.*\.md$/,
  /^PHASE_.*\.md$/,
  /_GENERATED\.md$/
];

const ARTIFACT_DIRS = ['reports', 'artifacts', 'temp', 'backups'];

function cleanArtifacts(dir: string): number {
  let count = 0;
  if (!fs.existsSync(dir)) return count;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (['.git', 'node_modules', '.next', 'out'].includes(entry.name)) continue;

    if (entry.isDirectory()) {
      if (ARTIFACT_DIRS.includes(entry.name)) {
        console.log(`🗑️  Removing directory: ${fullPath}`);
        fs.rmSync(fullPath, { recursive: true, force: true });
        count++;
      } else {
        count += cleanArtifacts(fullPath);
      }
    } else if (ARTIFACT_PATTERNS.some(p => p.test(entry.name))) {
      console.log(`🗑️  Removing file: ${fullPath}`);
      fs.unlinkSync(fullPath);
      count++;
    }
  }
  return count;
}

console.log('\n🧹 CLEANING ARTIFACTS\n');
console.log('='.repeat(50));

const removed = cleanArtifacts(process.cwd());

console.log('\n' + '='.repeat(50));
console.log(`\n✅ Removed ${removed} artifacts\n`);
