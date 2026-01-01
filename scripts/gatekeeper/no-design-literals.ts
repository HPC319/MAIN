/**
 * No Design Literals - Design Token Enforcement
 * Prevents hardcoded colors, spacing, typography values
 */

import * as fs from 'fs';
import * as path from 'path';

interface DesignLiteralViolation {
  file: string;
  line: number;
  value: string;
  type: string;
  suggestion: string;
}

export class NoDesignLiteralsChecker {
  private violations: DesignLiteralViolation[] = [];
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

    console.log('✓ No design literals found');
    return true;
  }

  private scanDirectory(dir: string): void {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (entry.name.match(/\.(tsx?|css|scss)$/)) {
        this.checkFile(fullPath);
      }
    });
  }

  private checkFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (this.isTokenReference(line)) return;

      this.checkColorLiterals(line, index + 1, filePath);
      this.checkSpacingLiterals(line, index + 1, filePath);
      this.checkTypographyLiterals(line, index + 1, filePath);
      this.checkBorderRadiusLiterals(line, index + 1, filePath);
      this.checkShadowLiterals(line, index + 1, filePath);
    });
  }

  private checkColorLiterals(line: string, lineNum: number, file: string): void {
    const patterns = [
      { regex: /#([0-9a-fA-F]{3,8})\b/g, suggestion: 'tokens.colors.*' },
      { regex: /rgb\(([^)]+)\)/g, suggestion: 'tokens.colors.*' },
      { regex: /rgba\(([^)]+)\)/g, suggestion: 'tokens.colors.*' },
      { regex: /hsl\(([^)]+)\)/g, suggestion: 'tokens.colors.*' }
    ];

    patterns.forEach(({ regex, suggestion }) => {
      let match;
      while ((match = regex.exec(line)) !== null) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: match[0],
          type: 'color-literal',
          suggestion
        });
      }
    });
  }

  private checkSpacingLiterals(line: string, lineNum: number, file: string): void {
    const spacingRegex = /\b(\d+)(px|rem|em)\b/g;
    let match;

    while ((match = spacingRegex.exec(line)) !== null) {
      const value = parseInt(match[1]);
      if (value > 0 && value % 4 === 0) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: match[0],
          type: 'spacing-literal',
          suggestion: 'tokens.spacing.*'
        });
      }
    }
  }

  private checkTypographyLiterals(line: string, lineNum: number, file: string): void {
    const fontSizeRegex = /fontSize:\s*['"]?(\d+)(px|rem|em)['"]?/g;
    let match;

    while ((match = fontSizeRegex.exec(line)) !== null) {
      this.violations.push({
        file: path.relative(this.rootDir, file),
        line: lineNum,
        value: match[0],
        type: 'typography-literal',
        suggestion: 'tokens.typography.fontSize.*'
      });
    }

    const fontWeightRegex = /fontWeight:\s*['"]?(\d{3})['"]?/g;
    while ((match = fontWeightRegex.exec(line)) !== null) {
      this.violations.push({
        file: path.relative(this.rootDir, file),
        line: lineNum,
        value: match[0],
        type: 'typography-literal',
        suggestion: 'tokens.typography.fontWeight.*'
      });
    }
  }

  private checkBorderRadiusLiterals(line: string, lineNum: number, file: string): void {
    const radiusRegex = /borderRadius:\s*['"]?(\d+)(px|rem)['"]?/g;
    let match;

    while ((match = radiusRegex.exec(line)) !== null) {
      this.violations.push({
        file: path.relative(this.rootDir, file),
        line: lineNum,
        value: match[0],
        type: 'border-radius-literal',
        suggestion: 'tokens.borderRadius.*'
      });
    }
  }

  private checkShadowLiterals(line: string, lineNum: number, file: string): void {
    const shadowRegex = /boxShadow:\s*['"]([^'"]+)['"]?/g;
    let match;

    while ((match = shadowRegex.exec(line)) !== null) {
      if (!match[1].startsWith('var(') && match[1].length > 10) {
        this.violations.push({
          file: path.relative(this.rootDir, file),
          line: lineNum,
          value: match[0],
          type: 'shadow-literal',
          suggestion: 'tokens.shadows.*'
        });
      }
    }
  }

  private isTokenReference(line: string): boolean {
    return line.includes('tokens.') || 
           line.includes('theme.') || 
           line.includes('var(--') ||
           line.includes('$');
  }

  private printViolations(): void {
    console.log(`\n❌ Found ${this.violations.length} design literal(s):\n`);

    const byType = new Map<string, DesignLiteralViolation[]>();
    this.violations.forEach(v => {
      const existing = byType.get(v.type) || [];
      existing.push(v);
      byType.set(v.type, existing);
    });

    byType.forEach((violations, type) => {
      console.log(`\n${type}:`);
      violations.slice(0, 5).forEach(v => {
        console.log(`  ❌ ${v.file}:${v.line}`);
        console.log(`     Value: ${v.value}`);
        console.log(`     Use: ${v.suggestion}`);
      });
      if (violations.length > 5) {
        console.log(`  ... and ${violations.length - 5} more`);
      }
    });
  }
}

if (require.main === module) {
  const checker = new NoDesignLiteralsChecker();
  const passed = checker.check();
  process.exit(passed ? 0 : 1);
}
