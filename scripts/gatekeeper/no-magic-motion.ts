/**
 * No Magic Motion - Motion Token Enforcement
 * Prevents hardcoded motion values, enforces design system usage
 */

import * as fs from 'fs';
import * as path from 'path';

interface MagicMotionViolation {
  file: string;
  line: number;
  value: string;
  type: string;
}

export class NoMagicMotionChecker {
  private violations: MagicMotionViolation[] = [];
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

    console.log('✓ No magic motion values found');
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
      this.checkMagicDurations(line, index + 1, filePath);
      this.checkMagicDelays(line, index + 1, filePath);
      this.checkMagicSprings(line, index + 1, filePath);
      this.checkMagicTransforms(line, index + 1, filePath);
    });
  }

  private checkMagicDurations(line: string, lineNum: number, file: string): void {
    const durationRegex = /duration:\s*([0-9.]+)/g;
    let match;

    while ((match = durationRegex.exec(line)) !== null) {
      if (!this.isTokenReference(line)) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: match[1],
          type: 'magic-duration'
        });
      }
    }
  }

  private checkMagicDelays(line: string, lineNum: number, file: string): void {
    const delayRegex = /delay:\s*([0-9.]+)/g;
    let match;

    while ((match = delayRegex.exec(line)) !== null) {
      if (!this.isTokenReference(line)) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: match[1],
          type: 'magic-delay'
        });
      }
    }
  }

  private checkMagicSprings(line: string, lineNum: number, file: string): void {
    const springRegex = /(stiffness|damping|mass):\s*([0-9.]+)/g;
    let match;

    while ((match = springRegex.exec(line)) !== null) {
      if (!this.isTokenReference(line)) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: `${match[1]}: ${match[2]}`,
          type: 'magic-spring'
        });
      }
    }
  }

  private checkMagicTransforms(line: string, lineNum: number, file: string): void {
    const transformRegex = /(scale|rotate|translateX|translateY):\s*([0-9.]+)/g;
    let match;

    while ((match = transformRegex.exec(line)) !== null) {
      if (!this.isTokenReference(line) && parseFloat(match[2]) !== 0 && parseFloat(match[2]) !== 1) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: `${match[1]}: ${match[2]}`,
          type: 'magic-transform'
        });
      }
    }
  }

  private isTokenReference(line: string): boolean {
    return line.includes('motionTokens.') || 
           line.includes('animations.') || 
           line.includes('motion.');
  }

  private printViolations(): void {
    console.log(`\n❌ Found ${this.violations.length} magic motion value(s):\n`);

    const byType = new Map<string, MagicMotionViolation[]>();
    this.violations.forEach(v => {
      const existing = byType.get(v.type) || [];
      existing.push(v);
      byType.set(v.type, existing);
    });

    byType.forEach((violations, type) => {
      console.log(`\n${type}:`);
      violations.forEach(v => {
        console.log(`  ❌ ${v.file}:${v.line} → ${v.value}`);
      });
    });

    console.log('\n💡 Use motion tokens instead:');
    console.log('  - motionTokens.duration.fast / medium / slow');
    console.log('  - motionTokens.easing.smooth / snappy / bounce');
    console.log('  - motionTokens.spring.default / gentle / stiff');
  }
}

if (require.main === module) {
  const checker = new NoMagicMotionChecker();
  const passed = checker.check();
  process.exit(passed ? 0 : 1);
}
