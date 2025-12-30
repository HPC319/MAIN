#!/usr/bin/env node
/**
 * IMMUTABILITY ENFORCEMENT GATE
 * 
 * Constitutional Rule: The repository state must remain immutable during CI execution.
 * Enforcement: Detects any git modifications or untracked files.
 * Failure Mode: Hard stop with exit code 1 if any mutations detected.
 * 
 * This gate ensures no build processes, scripts, or side effects modify the repository.
 */

import { execSync } from 'child_process';
// import * as path from 'path';
import * as process from 'process';

interface ImmutabilityViolation {
  type: 'modified' | 'untracked' | 'deleted';
  file: string;
}

class ImmutabilityEnforcer {
  private violations: ImmutabilityViolation[] = [];
  private readonly repoRoot: string;

  constructor() {
    this.repoRoot = this.getRepoRoot();
  }

  private getRepoRoot(): string {
    try {
      return execSync('git rev-parse --show-toplevel', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();
    } catch (error) {
      console.error('❌ FATAL: Not a git repository');
      process.exit(1);
    }
  }

  private executeGitCommand(command: string): string {
    try {
      return execSync(command, {
        cwd: this.repoRoot,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim();
    } catch (error) {
      // Non-zero exit from git diff means changes exist
      if (command.includes('git diff --exit-code')) {
        return '';
      }
      throw error;
    }
  }

  private checkModifiedFiles(): void {
    // Check for modified tracked files
    const modified = this.executeGitCommand('git diff --name-only');
    if (modified) {
      modified.split('\n').forEach(file => {
        if (file.trim()) {
          this.violations.push({ type: 'modified', file: file.trim() });
        }
      });
    }

    // Check for staged changes
    const staged = this.executeGitCommand('git diff --cached --name-only');
    if (staged) {
      staged.split('\n').forEach(file => {
        if (file.trim()) {
          this.violations.push({ type: 'modified', file: file.trim() });
        }
      });
    }
  }

  private checkUntrackedFiles(): void {
    // Check for untracked files (excluding ignored files)
    const untracked = this.executeGitCommand('git ls-files --others --exclude-standard');
    if (untracked) {
      untracked.split('\n').forEach(file => {
        if (file.trim()) {
          this.violations.push({ type: 'untracked', file: file.trim() });
        }
      });
    }
  }

  private checkDeletedFiles(): void {
    // Check for deleted files
    const deleted = this.executeGitCommand('git ls-files --deleted');
    if (deleted) {
      deleted.split('\n').forEach(file => {
        if (file.trim()) {
          this.violations.push({ type: 'deleted', file: file.trim() });
        }
      });
    }
  }

  public enforce(): void {
    console.log('🔒 IMMUTABILITY GATE: Enforcing repository immutability...\n');

    this.checkModifiedFiles();
    this.checkUntrackedFiles();
    this.checkDeletedFiles();

    if (this.violations.length === 0) {
      console.log('✅ IMMUTABILITY GATE: PASSED');
      console.log('   Repository state is immutable. No modifications detected.\n');
      process.exit(0);
    } else {
      this.reportViolations();
      process.exit(1);
    }
  }

  private reportViolations(): void {
    console.error('❌ IMMUTABILITY GATE: FAILED\n');
    console.error('Constitutional Violation: Repository state has been mutated.\n');
    console.error(`Total Violations: ${this.violations.length}\n`);

    const byType = this.groupByType();

    if (byType.modified.length > 0) {
      console.error('MODIFIED FILES:');
      byType.modified.forEach(file => console.error(`  • ${file}`));
      console.error('');
    }

    if (byType.untracked.length > 0) {
      console.error('UNTRACKED FILES:');
      byType.untracked.forEach(file => console.error(`  • ${file}`));
      console.error('');
    }

    if (byType.deleted.length > 0) {
      console.error('DELETED FILES:');
      byType.deleted.forEach(file => console.error(`  • ${file}`));
      console.error('');
    }

    console.error('Enforcement Action: Hard stop. CI execution terminated.');
    console.error('Required Action: Investigate mutation source. No file generation or modification permitted during CI.\n');
  }

  private groupByType(): Record<'modified' | 'untracked' | 'deleted', string[]> {
    return {
      modified: this.violations.filter(v => v.type === 'modified').map(v => v.file),
      untracked: this.violations.filter(v => v.type === 'untracked').map(v => v.file),
      deleted: this.violations.filter(v => v.type === 'deleted').map(v => v.file)
    };
  }
}

// Execute enforcement
const enforcer = new ImmutabilityEnforcer();
enforcer.enforce();
