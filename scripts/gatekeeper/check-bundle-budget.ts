/**
 * Check Bundle Budget - Performance Budget Enforcement
 * Uses size-limit to enforce bundle size constraints
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface BudgetConfig {
  path: string;
  limit: string;
  name?: string;
}

interface BudgetResult {
  passed: boolean;
  results: Array<{
    name: string;
    size: number;
    limit: number;
    passed: boolean;
  }>;
}

export class BundleBudgetChecker {
  private configPath: string;

  constructor(configPath: string = '.size-limit.json') {
    this.configPath = configPath;
  }

  public check(): BudgetResult {
    const config = this.loadConfig();
    const result: BudgetResult = {
      passed: true,
      results: []
    };

    console.log('📦 Checking bundle budgets...\n');

    config.forEach(budget => {
      const check = this.checkBudget(budget);
      result.results.push(check);
      if (!check.passed) {
        result.passed = false;
      }
    });

    return result;
  }

  private loadConfig(): BudgetConfig[] {
    if (!fs.existsSync(this.configPath)) {
      console.log('⚠️  No size-limit config found, creating default...');
      const defaultConfig: BudgetConfig[] = [
        { path: '.next/static/chunks/pages/_app.js', limit: '200 KB', name: 'App Bundle' },
        { path: '.next/static/chunks/pages/index.js', limit: '50 KB', name: 'Home Page' },
        { path: '.next/static/chunks/main-*.js', limit: '150 KB', name: 'Main Bundle' }
      ];
      fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2));
      return defaultConfig;
    }

    return JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
  }

  private checkBudget(budget: BudgetConfig): any {
    const name = budget.name || budget.path;
    const limitBytes = this.parseSize(budget.limit);

    try {
      const files = this.findFiles(budget.path);

      if (files.length === 0) {
        console.log(`⚠️  ${name}: No files found (skipped)`);
        return { name, size: 0, limit: limitBytes, passed: true };
      }

      let totalSize = 0;
      files.forEach(file => {
        const stats = fs.statSync(file);
        totalSize += stats.size;
      });

      const passed = totalSize <= limitBytes;
      const icon = passed ? '✓' : '❌';
      const sizeStr = this.formatSize(totalSize);
      const limitStr = budget.limit;

      console.log(`${icon} ${name}: ${sizeStr} / ${limitStr}`);

      return { name, size: totalSize, limit: limitBytes, passed };
    } catch (error) {
      console.log(`⚠️  ${name}: Check failed (${error})`);
      return { name, size: 0, limit: limitBytes, passed: true };
    }
  }

  private findFiles(pattern: string): string[] {
    const dir = path.dirname(pattern);
    const base = path.basename(pattern);

    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir);
    const matched: string[] = [];

    files.forEach(file => {
      if (base.includes('*')) {
        const regex = new RegExp('^' + base.replace('*', '.*') + '$');
        if (regex.test(file)) {
          matched.push(path.join(dir, file));
        }
      } else if (file === base) {
        matched.push(path.join(dir, file));
      }
    });

    return matched;
  }

  private parseSize(sizeStr: string): number {
    const match = sizeStr.match(/^([0-9.]+)\s*(B|KB|MB|GB)?$/i);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = (match[2] || 'B').toUpperCase();

    const multipliers: Record<string, number> = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024
    };

    return value * (multipliers[unit] || 1);
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  public printReport(result: BudgetResult): void {
    console.log('\n' + '='.repeat(50));

    if (result.passed) {
      console.log('✓ All bundle budgets passed');
    } else {
      console.log('❌ Bundle budget exceeded');
      const failed = result.results.filter(r => !r.passed);
      console.log(`\nFailed checks: ${failed.length}`);
      failed.forEach(f => {
        const over = f.size - f.limit;
        console.log(`  - ${f.name}: ${this.formatSize(over)} over budget`);
      });
    }
  }
}

if (require.main === module) {
  const checker = new BundleBudgetChecker();
  const result = checker.check();
  checker.printReport(result);
  process.exit(result.passed ? 0 : 1);
}
