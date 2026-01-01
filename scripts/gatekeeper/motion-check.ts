/**
 * Motion Check - Framer Motion Validation
 * Ensures motion configurations use design tokens
 */

import * as fs from 'fs';
import * as path from 'path';

interface MotionViolation {
  file: string;
  line: number;
  type: string;
  message: string;
}

export class MotionChecker {
  private violations: MotionViolation[] = [];
  private rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
  }

  public check(): boolean {
    this.violations = [];
    this.scanDirectory(path.join(this.rootDir, 'src'));

    if (this.violations.length > 0) {
      this.printViolations();
      return false;
    }

    console.log('✓ All motion checks passed');
    return true;
  }

  private scanDirectory(dir: string): void {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (entry.name.match(/\.(tsx?)$/)) {
        this.checkFile(fullPath);
      }
    });
  }

  private checkFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      this.checkInlineMotion(line, index + 1, filePath);
      this.checkHardcodedDurations(line, index + 1, filePath);
      this.checkHardcodedEasing(line, index + 1, filePath);
    });
  }

  private checkInlineMotion(line: string, lineNum: number, file: string): void {
    const inlineMotionPatterns = [
      /initial=\{\{/,
      /animate=\{\{/,
      /exit=\{\{/,
      /transition=\{\{/
    ];

    inlineMotionPatterns.forEach(pattern => {
      if (pattern.test(line) && !line.includes('motionTokens') && !line.includes('animations.')) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          type: 'inline-motion',
          message: 'Inline motion configuration detected. Use motion tokens instead.'
        });
      }
    });
  }

  private checkHardcodedDurations(line: string, lineNum: number, file: string): void {
    const durationPattern = /duration:\s*[0-9.]+/;

    if (durationPattern.test(line) && !line.includes('motionTokens') && !line.includes('duration.')) {
      this.violations.push({
        file: path.relative(this.rootDir, file),
        line: lineNum,
        type: 'hardcoded-duration',
        message: 'Hardcoded duration value. Use motion tokens (e.g., motionTokens.duration.fast).'
      });
    }
  }

  private checkHardcodedEasing(line: string, lineNum: number, file: string): void {
    const easingPatterns = [
      /"ease-in"/,
      /"ease-out"/,
      /"ease-in-out"/,
      /"linear"/,
      /\[\s*[0-9.]+\s*,\s*[0-9.]+\s*,\s*[0-9.]+\s*,\s*[0-9.]+\s*\]/
    ];

    easingPatterns.forEach(pattern => {
      if (pattern.test(line) && !line.includes('motionTokens') && !line.includes('easing.')) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          type: 'hardcoded-easing',
          message: 'Hardcoded easing function. Use motion tokens (e.g., motionTokens.easing.smooth).'
        });
      }
    });
  }

  private printViolations(): void {
    console.log(`\n❌ Found ${this.violations.length} motion violation(s):\n`);

    this.violations.forEach(v => {
      console.log(`❌ ${v.file}:${v.line}`);
      console.log(`   [${v.type}] ${v.message}\n`);
    });
  }
}

if (require.main === module) {
  const checker = new MotionChecker();
  const passed = checker.check();
  process.exit(passed ? 0 : 1);
}
