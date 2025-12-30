#!/usr/bin/env tsx
/**
 * Pre-Commit Validation Hook
 * Fast validation before committing code
 */

import { execSync } from 'child_process';
import * as fs from 'fs';

interface CheckResult {
  name: string;
  passed: boolean;
  message?: string;
}

class PreCommitValidator {
  private results: CheckResult[] = [];

  constructor() {
    console.log('\n🔒 PRE-COMMIT VALIDATION\n');
    console.log('='.repeat(50));
  }

  private exec(command: string): string {
    try {
      return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
    } catch (error) {
      throw error;
    }
  }

  private check(name: string, fn: () => boolean): CheckResult {
    console.log(`\n▶ ${name}...`);
    try {
      const passed = fn();
      console.log(passed ? `✅ ${name}` : `❌ ${name} failed`);
      return { name, passed };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ ${name}: ${msg}`);
      return { name, passed: false, message: msg };
    }
  }

  private getStagedFiles(): string[] {
    try {
      const output = this.exec('git diff --cached --name-only --diff-filter=ACM');
      return output ? output.split('\n').filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  private checkArtifacts(): boolean {
    const files = this.getStagedFiles();
    const patterns = [/\.backup$/, /\.temp$/, /^AUDIT_.*\.md$/, /^COMPREHENSIVE_.*\.md$/];
    const contaminated = files.filter(f => patterns.some(p => p.test(f)));
    if (contaminated.length > 0) {
      console.error('\n⚠️  Artifacts detected:', contaminated);
      return false;
    }
    return true;
  }

  private checkLint(): boolean {
    const files = this.getStagedFiles().filter(f => /\.(ts|tsx)$/.test(f));
    if (files.length === 0) return true;
    try {
      this.exec(`npx eslint ${files.join(' ')}`);
      return true;
    } catch {
      console.error('💡 Fix: npm run lint:fix');
      return false;
    }
  }

  private checkFormat(): boolean {
    const files = this.getStagedFiles().filter(f => /\.(ts|tsx|js|jsx|json|css|md)$/.test(f));
    if (files.length === 0) return true;
    try {
      this.exec(`npx prettier --check ${files.join(' ')}`);
      return true;
    } catch {
      console.error('💡 Fix: npm run format');
      return false;
    }
  }

  async validate(): Promise<boolean> {
    const files = this.getStagedFiles();
    if (files.length === 0) {
      console.log('\n⚠️  No staged files');
      return false;
    }
    console.log(`\n📝 Staged: ${files.length} files`);

    this.results.push(this.check('Artifacts', () => this.checkArtifacts()));
    this.results.push(this.check('Format', () => this.checkFormat()));
    this.results.push(this.check('Lint', () => this.checkLint()));

    const failed = this.results.filter(r => !r.passed).length;
    console.log('\n' + '='.repeat(50));
    console.log(`\n✅ ${this.results.length - failed}  ❌ ${failed}\n`);
    return failed === 0;
  }
}

new PreCommitValidator().validate().then(s => process.exit(s ? 0 : 1)).catch(() => process.exit(1));
