/**
 * Boundary Check - Layer Isolation Validator
 * Enforces strict layer boundaries and dependency rules
 */

import * as fs from 'fs';
import * as path from 'path';

interface BoundaryRule {
  layer: string;
  canImport: string[];
  cannotImport: string[];
}

const BOUNDARY_RULES: BoundaryRule[] = [
  {
    layer: 'src/core',
    canImport: [],
    cannotImport: ['src/kernel', 'src/lib', 'src/components', 'src/app', 'src/contractors']
  },
  {
    layer: 'src/kernel',
    canImport: ['src/core'],
    cannotImport: ['src/lib', 'src/components', 'src/app', 'src/contractors']
  },
  {
    layer: 'src/lib',
    canImport: ['src/core', 'src/kernel'],
    cannotImport: ['src/components', 'src/app', 'src/contractors']
  },
  {
    layer: 'src/components',
    canImport: ['src/core', 'src/kernel', 'src/lib'],
    cannotImport: ['src/app', 'src/contractors']
  },
  {
    layer: 'src/app',
    canImport: ['src/core', 'src/kernel', 'src/lib', 'src/components'],
    cannotImport: ['src/contractors']
  },
  {
    layer: 'src/contractors',
    canImport: ['src/core/types', 'src/core/interfaces', 'src/core/schemas'],
    cannotImport: ['src/kernel', 'src/lib', 'src/components', 'src/app']
  }
];

interface Violation {
  file: string;
  line: number;
  imported: string;
  reason: string;
}

export class BoundaryChecker {
  private violations: Violation[] = [];
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

    console.log('✓ All boundary checks passed');
    return true;
  }

  private scanDirectory(dir: string): void {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (entry.name.match(/\.(ts|tsx)$/)) {
        this.checkFile(fullPath);
      }
    });
  }

  private checkFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    const fileLayer = this.getLayerFromPath(filePath);
    if (!fileLayer) return;

    const rule = BOUNDARY_RULES.find(r => filePath.includes(r.layer));
    if (!rule) return;

    lines.forEach((line, index) => {
      const importMatch = line.match(/from ['"]([^'"]+)['"]/);
      if (!importMatch) return;

      const importPath = importMatch[1];
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) return;

      const resolvedPath = path.resolve(path.dirname(filePath), importPath);
      const importLayer = this.getLayerFromPath(resolvedPath);

      if (!importLayer) return;

      if (rule.cannotImport.some(forbidden => importLayer.includes(forbidden))) {
        this.violations.push({
          file: path.relative(this.rootDir, filePath),
          line: index + 1,
          imported: importPath,
          reason: `Layer "${rule.layer}" cannot import from "${importLayer}"`
        });
      }

      if (rule.canImport.length > 0 && 
          !rule.canImport.some(allowed => importLayer.includes(allowed))) {
        this.violations.push({
          file: path.relative(this.rootDir, filePath),
          line: index + 1,
          imported: importPath,
          reason: `Layer "${rule.layer}" can only import from [${rule.canImport.join(', ')}]`
        });
      }
    });
  }

  private getLayerFromPath(filePath: string): string | null {
    const normalized = path.normalize(filePath);
    for (const rule of BOUNDARY_RULES) {
      if (normalized.includes(rule.layer)) {
        return rule.layer;
      }
    }
    return null;
  }

  private printViolations(): void {
    console.log(`\n❌ Found ${this.violations.length} boundary violation(s):\n`);

    this.violations.forEach(v => {
      console.log(`❌ ${v.file}:${v.line}`);
      console.log(`   Imported: ${v.imported}`);
      console.log(`   Reason: ${v.reason}\n`);
    });
  }
}

if (require.main === module) {
  const checker = new BoundaryChecker();
  const passed = checker.check();
  process.exit(passed ? 0 : 1);
}
