#!/usr/bin/env tsx
/**
 * CI Validation Orchestrator
 * Comprehensive validation suite for Canonstrata system
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
}

class CIValidator {
  private results: ValidationResult[] = [];
  private startTime = Date.now();

  constructor() {
    console.log('\n🚀 CANONSTRATA CI VALIDATION\n');
    console.log('='.repeat(60));
  }

  private async runStep(name: string, command: string, _critical: boolean = true): Promise<ValidationResult> {
    const stepStart = Date.now();
    console.log(`\n▶ ${name}...`);
    try {
      execSync(command, { stdio: 'inherit', encoding: 'utf-8', env: { ...process.env, FORCE_COLOR: '1' } });
      const duration = Date.now() - stepStart;
      console.log(`✅ ${name} (${(duration / 1000).toFixed(2)}s)`);
      return { name, passed: true, duration };
    } catch (error) {
      const duration = Date.now() - stepStart;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ ${name} FAILED (${(duration / 1000).toFixed(2)}s)`);
      return { name, passed: false, duration, error: errorMsg };
    }
  }

  private checkArtifacts(): ValidationResult {
    const stepStart = Date.now();
    console.log('\n▶ Artifact contamination check...');
    const patterns = [/\.backup$/, /\.temp$/, /^AUDIT_.*\.md$/, /^COMPREHENSIVE_.*\.md$/];
    const contaminated: string[] = [];
    const checkDir = (dir: string) => {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
          const fullPath = path.join(dir, entry.name);
          if (['.git', 'node_modules', '.next'].includes(entry.name)) return;
          if (entry.isDirectory()) checkDir(fullPath);
          else if (patterns.some(p => p.test(entry.name))) contaminated.push(fullPath);
        });
      }
    };
    checkDir(process.cwd());
    const duration = Date.now() - stepStart;
    if (contaminated.length > 0) {
      console.error(`❌ Found ${contaminated.length} artifact files`);
      return { name: 'Artifacts', passed: false, duration, error: `${contaminated.length} files` };
    }
    console.log(`✅ No artifacts (${(duration / 1000).toFixed(2)}s)`);
    return { name: 'Artifacts', passed: true, duration };
  }

  async validate(): Promise<boolean> {
    this.results.push(this.checkArtifacts());
    this.results.push(await this.runStep('Lint', 'npm run lint'));
    this.results.push(await this.runStep('Format', 'npm run format:check'));
    this.results.push(await this.runStep('TypeCheck', 'npm run typecheck'));
    this.results.push(await this.runStep('Tests', 'npm run test', false));
    this.results.push(await this.runStep('Build', 'npm run build'));

    const failed = this.results.filter(r => !r.passed).length;
    const passed = this.results.filter(r => r.passed).length;
    const total = Date.now() - this.startTime;

    console.log('\n' + '='.repeat(60));
    console.log(`\n✅ Passed: ${passed}  ❌ Failed: ${failed}  ⏱️  ${(total / 1000).toFixed(2)}s\n`);
    return failed === 0;
  }
}

new CIValidator().validate().then(s => process.exit(s ? 0 : 1)).catch(() => process.exit(1));
