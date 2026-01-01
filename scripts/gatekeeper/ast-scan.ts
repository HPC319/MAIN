/**
 * AST Scanner - Codebase Analysis Tool
 * Scans entire codebase for architectural compliance
 */

import { Project } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

interface ScanResult {
  totalFiles: number;
  filesByLayer: Record<string, number>;
  dependencies: Record<string, string[]>;
  complexity: Record<string, number>;
  coverage: {
    typedFiles: number;
    testedFiles: number;
    documentedFiles: number;
  };
}

export class ASTScanner {
  private project: Project;

  constructor(tsconfigPath: string) {
    this.project = new Project({
      tsConfigFilePath: tsconfigPath,
      skipAddingFilesFromTsConfig: false
    });
  }

  public scan(): ScanResult {
    const sourceFiles = this.project.getSourceFiles();
    const result: ScanResult = {
      totalFiles: sourceFiles.length,
      filesByLayer: {},
      dependencies: {},
      complexity: {},
      coverage: {
        typedFiles: 0,
        testedFiles: 0,
        documentedFiles: 0
      }
    };

    sourceFiles.forEach(file => {
      const filePath = file.getFilePath();
      const layer = this.detectLayer(filePath);

      result.filesByLayer[layer] = (result.filesByLayer[layer] || 0) + 1;
      result.dependencies[filePath] = this.extractDependencies(file);
      result.complexity[filePath] = this.calculateComplexity(file);

      if (this.hasTypeAnnotations(file)) result.coverage.typedFiles++;
      if (this.hasTests(filePath)) result.coverage.testedFiles++;
      if (this.hasDocumentation(file)) result.coverage.documentedFiles++;
    });

    return result;
  }

  private detectLayer(filePath: string): string {
    if (filePath.includes('src/core')) return 'kernel-core';
    if (filePath.includes('src/kernel')) return 'kernel';
    if (filePath.includes('src/lib')) return 'governed-lib';
    if (filePath.includes('src/components')) return 'governed-components';
    if (filePath.includes('src/app')) return 'surface';
    if (filePath.includes('src/contractors')) return 'isolation';
    return 'other';
  }

  private extractDependencies(file: any): string[] {
    return file.getImportDeclarations()
      .map((imp: any) => imp.getModuleSpecifierValue())
      .filter((mod: string) => !mod.startsWith('.'));
  }

  private calculateComplexity(file: any): number {
    let complexity = 1;
    file.getDescendants().forEach((node: any) => {
      const kind = node.getKindName();
      if (['IfStatement', 'ForStatement', 'WhileStatement', 'SwitchStatement'].includes(kind)) {
        complexity++;
      }
    });
    return complexity;
  }

  private hasTypeAnnotations(file: any): boolean {
    const text = file.getFullText();
    return text.includes(': ') && !text.includes(': any');
  }

  private hasTests(filePath: string): boolean {
    const testPath = filePath.replace(/\.(ts|tsx)$/, '.test.$1');
    return fs.existsSync(testPath);
  }

  private hasDocumentation(file: any): boolean {
    const jsDocs = file.getDescendantsOfKind(291); // JSDoc kind
    return jsDocs.length > 0;
  }

  public printReport(result: ScanResult): void {
    console.log('\n📊 Codebase Scan Report\n');
    console.log(`Total Files: ${result.totalFiles}\n`);

    console.log('Files by Layer:');
    Object.entries(result.filesByLayer).forEach(([layer, count]) => {
      console.log(`  ${layer}: ${count}`);
    });

    console.log('\nCoverage:');
    console.log(`  Typed: ${result.coverage.typedFiles}/${result.totalFiles}`);
    console.log(`  Tested: ${result.coverage.testedFiles}/${result.totalFiles}`);
    console.log(`  Documented: ${result.coverage.documentedFiles}/${result.totalFiles}`);
  }
}

if (require.main === module) {
  const scanner = new ASTScanner('./tsconfig.json');
  const result = scanner.scan();
  scanner.printReport(result);
}
