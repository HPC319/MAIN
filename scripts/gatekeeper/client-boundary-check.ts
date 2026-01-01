/**
 * Client Boundary Check - Client/Server Validation
 * Ensures proper use of 'use client' and 'use server' directives
 */

import * as fs from 'fs';
import * as path from 'path';

interface BoundaryViolation {
  file: string;
  line?: number;
  violation: string;
  severity: 'error' | 'warning';
}

export class ClientBoundaryChecker {
  private violations: BoundaryViolation[] = [];
  private rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
  }

  public check(): boolean {
    this.violations = [];
    this.scanDirectory(path.join(this.rootDir, 'src'));

    if (this.violations.filter(v => v.severity === 'error').length > 0) {
      this.printViolations();
      return false;
    }

    console.log('✓ All client boundary checks passed');
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
    const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
    const hasUseServer = content.includes("'use server'") || content.includes('"use server"');

    if (hasUseClient && hasUseServer) {
      this.violations.push({
        file: path.relative(this.rootDir, filePath),
        violation: 'File contains both "use client" and "use server" directives',
        severity: 'error'
      });
    }

    if (hasUseClient) {
      this.checkClientFile(filePath, content);
    }

    if (hasUseServer) {
      this.checkServerFile(filePath, content);
    }

    this.checkMissingDirective(filePath, content);
  }

  private checkClientFile(filePath: string, content: string): void {
    const serverOnlyImports = [
      'fs', 'path', 'crypto', 'child_process', 'os', 'net', 'http', 'https'
    ];

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const importMatch = line.match(/from ['"]([^'"]+)['"]/);
      if (importMatch) {
        const imported = importMatch[1];
        if (serverOnlyImports.some(mod => imported === mod || imported.startsWith(`${mod}/`))) {
          this.violations.push({
            file: path.relative(this.rootDir, filePath),
            line: index + 1,
            violation: `Client component imports server-only module: ${imported}`,
            severity: 'error'
          });
        }
      }

      if (line.includes('process.env') && !line.includes('NEXT_PUBLIC_')) {
        this.violations.push({
          file: path.relative(this.rootDir, filePath),
          line: index + 1,
          violation: 'Client component accessing non-public environment variable',
          severity: 'error'
        });
      }
    });
  }

  private checkServerFile(filePath: string, content: string): void {
    const clientOnlyPatterns = [
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'useCallback',
      'useMemo',
      'useRef',
      'useLayoutEffect'
    ];

    const lines = content.split('\n');
    lines.forEach((line, index) => {
      clientOnlyPatterns.forEach(hook => {
        if (line.includes(hook)) {
          this.violations.push({
            file: path.relative(this.rootDir, filePath),
            line: index + 1,
            violation: `Server component uses client-only hook: ${hook}`,
            severity: 'error'
          });
        }
      });
    });
  }

  private checkMissingDirective(filePath: string, content: string): void {
    if (filePath.includes('src/app/')) return;

    const hasDirective = content.includes("'use client'") || 
                        content.includes('"use client"') ||
                        content.includes("'use server'") ||
                        content.includes('"use server"');

    const needsDirective = content.includes('useState') ||
                          content.includes('useEffect') ||
                          content.includes('onClick') ||
                          content.includes('onChange');

    if (needsDirective && !hasDirective) {
      this.violations.push({
        file: path.relative(this.rootDir, filePath),
        violation: 'File appears to need "use client" directive but is missing it',
        severity: 'warning'
      });
    }
  }

  private printViolations(): void {
    const errors = this.violations.filter(v => v.severity === 'error');
    const warnings = this.violations.filter(v => v.severity === 'warning');

    if (errors.length > 0) {
      console.log(`\n❌ Found ${errors.length} client boundary error(s):\n`);
      errors.forEach(v => {
        console.log(`❌ ${v.file}${v.line ? `:${v.line}` : ''}`);
        console.log(`   ${v.violation}\n`);
      });
    }

    if (warnings.length > 0) {
      console.log(`\n⚠️  Found ${warnings.length} client boundary warning(s):\n`);
      warnings.forEach(v => {
        console.log(`⚠️  ${v.file}${v.line ? `:${v.line}` : ''}`);
        console.log(`   ${v.violation}\n`);
      });
    }
  }
}

if (require.main === module) {
  const checker = new ClientBoundaryChecker();
  const passed = checker.check();
  process.exit(passed ? 0 : 1);
}
