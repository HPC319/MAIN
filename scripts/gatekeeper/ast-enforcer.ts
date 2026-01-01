/**
 * AST Enforcer - Constitutional Rule Engine
 * Uses ts-morph for static analysis of architectural boundaries
 */

import { Project, SyntaxKind, SourceFile, Node } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

interface Violation {
  file: string;
  line: number;
  column: number;
  rule: string;
  message: string;
  severity: 'error' | 'warning';
}

interface EnforcementResult {
  violations: Violation[];
  passed: boolean;
  filesScanned: number;
}

const LAYER_BOUNDARIES = {
  kernel: ['src/core', 'src/kernel'],
  governed: ['src/lib', 'src/components'],
  surface: ['src/app'],
  isolation: ['src/contractors']
} as const;

const IMPORT_RULES = {
  'src/core': [],
  'src/kernel': ['src/core'],
  'src/lib': ['src/core', 'src/kernel'],
  'src/components': ['src/core', 'src/kernel', 'src/lib'],
  'src/app': ['src/core', 'src/kernel', 'src/lib', 'src/components'],
  'src/contractors': []
} as const;

export class ASTEnforcer {
  private project: Project;
  private violations: Violation[] = [];

  constructor(tsconfigPath: string) {
    this.project = new Project({
      tsConfigFilePath: tsconfigPath,
      skipAddingFilesFromTsConfig: false
    });
  }

  public enforce(): EnforcementResult {
    this.violations = [];
    const sourceFiles = this.project.getSourceFiles();

    sourceFiles.forEach(file => {
      this.checkFile(file);
    });

    return {
      violations: this.violations,
      passed: this.violations.filter(v => v.severity === 'error').length === 0,
      filesScanned: sourceFiles.length
    };
  }

  private checkFile(file: SourceFile): void {
    const filePath = file.getFilePath();

    this.checkImportBoundaries(file);
    this.checkClientServerBoundaries(file);
    this.checkDesignLiterals(file);
    this.checkMotionLiterals(file);
    this.checkContractorIsolation(file);
    this.checkPuretyAnnotations(file);
  }

  private checkImportBoundaries(file: SourceFile): void {
    const filePath = file.getFilePath();
    const fileLayer = this.getFileLayer(filePath);

    if (!fileLayer) return;

    const imports = file.getImportDeclarations();
    const allowedImports = IMPORT_RULES[fileLayer] || [];

    imports.forEach(imp => {
      const moduleSpecifier = imp.getModuleSpecifierValue();

      if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('/')) {
        const resolvedPath = path.resolve(path.dirname(filePath), moduleSpecifier);
        const importLayer = this.getFileLayer(resolvedPath);

        if (importLayer && !allowedImports.includes(importLayer)) {
          this.addViolation(file, imp, 'import-boundary', 
            `Layer "${fileLayer}" cannot import from "${importLayer}". Allowed: [${allowedImports.join(', ')}]`,
            'error'
          );
        }
      }
    });
  }

  private checkClientServerBoundaries(file: SourceFile): void {
    const hasUseClient = file.getFullText().includes("'use client'") || 
                        file.getFullText().includes('"use client"');
    const hasUseServer = file.getFullText().includes("'use server'") || 
                         file.getFullText().includes('"use server"');

    if (hasUseClient && hasUseServer) {
      this.addViolation(file, file, 'client-server-boundary',
        'File cannot have both "use client" and "use server" directives',
        'error'
      );
    }

    if (hasUseClient) {
      const serverOnlyImports = ['fs', 'path', 'crypto', 'process'];
      file.getImportDeclarations().forEach(imp => {
        const module = imp.getModuleSpecifierValue();
        if (serverOnlyImports.some(s => module.startsWith(s))) {
          this.addViolation(file, imp, 'client-server-boundary',
            `Client component cannot import server-only module "${module}"`,
            'error'
          );
        }
      });
    }
  }

  private checkDesignLiterals(file: SourceFile): void {
    const literals = file.getDescendantsOfKind(SyntaxKind.StringLiteral);
    const cssPatterns = [
      /^#[0-9a-fA-F]{3,8}$/,
      /^rgb\(/,
      /^rgba\(/,
      /^\d+px$/,
      /^\d+rem$/,
      /^\d+em$/
    ];

    literals.forEach(literal => {
      const value = literal.getLiteralValue();
      if (cssPatterns.some(pattern => pattern.test(value))) {
        const parent = literal.getParent();
        if (!this.isTokenReference(parent)) {
          this.addViolation(file, literal, 'no-design-literals',
            `Hardcoded design value "${value}" found. Use design tokens instead.`,
            'error'
          );
        }
      }
    });
  }

  private checkMotionLiterals(file: SourceFile): void {
    const objects = file.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression);

    objects.forEach(obj => {
      const properties = obj.getProperties();
      const hasMotionProps = properties.some(prop => {
        const name = prop.getName();
        return ['initial', 'animate', 'exit', 'transition', 'variants'].includes(name);
      });

      if (hasMotionProps && !this.isMotionTokenReference(obj)) {
        this.addViolation(file, obj, 'no-magic-motion',
          'Inline motion configuration found. Use motion tokens from design system.',
          'error'
        );
      }
    });
  }

  private checkContractorIsolation(file: SourceFile): void {
    const filePath = file.getFilePath();
    const isContractor = filePath.includes('src/contractors/');

    if (isContractor) {
      const imports = file.getImportDeclarations();
      imports.forEach(imp => {
        const module = imp.getModuleSpecifierValue();
        if (module.startsWith('.') && !module.includes('/contractors/')) {
          if (!module.includes('/core/types') && !module.includes('/core/interfaces')) {
            this.addViolation(file, imp, 'contractor-isolation',
              'Contractors can only import contract surfaces (types/interfaces) from core',
              'error'
            );
          }
        }
      });
    }
  }

  private checkPuretyAnnotations(file: SourceFile): void {
    const functions = file.getFunctions();
    const filePath = file.getFilePath();
    const isLib = filePath.includes('src/lib/');

    if (isLib) {
      functions.forEach(fn => {
        const jsDocs = fn.getJsDocs();
        const hasPureTag = jsDocs.some(doc => 
          doc.getTags().some(tag => tag.getTagName() === 'pure')
        );

        if (!hasPureTag && this.hasSideEffects(fn)) {
          this.addViolation(file, fn, 'purity-annotation',
            `Function "${fn.getName()}" in src/lib must be pure or annotated with side effects`,
            'warning'
          );
        }
      });
    }
  }

  private getFileLayer(filePath: string): keyof typeof IMPORT_RULES | null {
    for (const [layer, allowed] of Object.entries(IMPORT_RULES)) {
      if (filePath.includes(layer)) {
        return layer as keyof typeof IMPORT_RULES;
      }
    }
    return null;
  }

  private isTokenReference(node: Node): boolean {
    const text = node.getText();
    return text.includes('tokens.') || text.includes('theme.') || text.includes('$');
  }

  private isMotionTokenReference(node: Node): boolean {
    const text = node.getText();
    return text.includes('motionTokens.') || text.includes('animations.');
  }

  private hasSideEffects(node: Node): boolean {
    const descendants = node.getDescendants();
    return descendants.some(d => 
      d.getKind() === SyntaxKind.CallExpression &&
      !this.isPureFunction(d.getText())
    );
  }

  private isPureFunction(text: string): boolean {
    const pureFunctions = ['map', 'filter', 'reduce', 'slice', 'concat'];
    return pureFunctions.some(fn => text.includes(`.${fn}(`));
  }

  private addViolation(
    file: SourceFile,
    node: Node,
    rule: string,
    message: string,
    severity: 'error' | 'warning'
  ): void {
    const { line, column } = file.getLineAndColumnAtPos(node.getStart());

    this.violations.push({
      file: file.getFilePath(),
      line,
      column,
      rule,
      message,
      severity
    });
  }

  public printReport(): void {
    if (this.violations.length === 0) {
      console.log('✓ All AST checks passed');
      return;
    }

    console.log(`\n❌ Found ${this.violations.length} violation(s):\n`);

    this.violations.forEach(v => {
      const icon = v.severity === 'error' ? '❌' : '⚠️';
      console.log(`${icon} ${v.file}:${v.line}:${v.column}`);
      console.log(`   [${v.rule}] ${v.message}\n`);
    });
  }
}

if (require.main === module) {
  const enforcer = new ASTEnforcer('./tsconfig.json');
  const result = enforcer.enforce();

  enforcer.printReport();

  if (!result.passed) {
    process.exit(1);
  }
}
