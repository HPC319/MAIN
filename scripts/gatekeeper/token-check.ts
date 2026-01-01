/**
 * Token Check - Design System Validator
 * Ensures all design tokens are properly defined and used
 */

import * as fs from 'fs';
import * as path from 'path';

interface TokenFile {
  path: string;
  tokens: Record<string, any>;
}

interface TokenValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class TokenChecker {
  private tokenDir: string;
  private errors: string[] = [];
  private warnings: string[] = [];

  constructor(tokenDir: string = 'design-system/tokens') {
    this.tokenDir = tokenDir;
  }

  public validate(): TokenValidation {
    this.errors = [];
    this.warnings = [];

    if (!fs.existsSync(this.tokenDir)) {
      this.errors.push(`Token directory not found: ${this.tokenDir}`);
      return this.buildResult();
    }

    const tokenFiles = this.loadTokenFiles();

    this.validateTokenStructure(tokenFiles);
    this.validateTokenReferences(tokenFiles);
    this.validateTokenNaming(tokenFiles);
    this.checkForDuplicates(tokenFiles);

    return this.buildResult();
  }

  private loadTokenFiles(): TokenFile[] {
    const files: TokenFile[] = [];
    const entries = fs.readdirSync(this.tokenDir);

    entries.forEach(entry => {
      if (entry.endsWith('.tokens.json')) {
        const filePath = path.join(this.tokenDir, entry);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const tokens = JSON.parse(content);
          files.push({ path: entry, tokens });
        } catch (error) {
          this.errors.push(`Failed to parse ${entry}: ${error}`);
        }
      }
    });

    return files;
  }

  private validateTokenStructure(files: TokenFile[]): void {
    const requiredFiles = [
      'colors.tokens.json',
      'typography.tokens.json',
      'spacing.tokens.json',
      'motion.tokens.json'
    ];

    requiredFiles.forEach(required => {
      if (!files.some(f => f.path === required)) {
        this.errors.push(`Missing required token file: ${required}`);
      }
    });

    files.forEach(file => {
      if (typeof file.tokens !== 'object' || file.tokens === null) {
        this.errors.push(`Invalid token structure in ${file.path}`);
      }
    });
  }

  private validateTokenReferences(files: TokenFile[]): void {
    const allTokens = new Map<string, any>();

    files.forEach(file => {
      Object.entries(file.tokens).forEach(([key, value]) => {
        allTokens.set(key, value);
      });
    });

    files.forEach(file => {
      this.checkReferences(file.tokens, allTokens, file.path);
    });
  }

  private checkReferences(
    obj: any,
    allTokens: Map<string, any>,
    filePath: string,
    path: string = ''
  ): void {
    if (typeof obj === 'string' && obj.startsWith('{') && obj.endsWith('}')) {
      const ref = obj.slice(1, -1);
      if (!allTokens.has(ref)) {
        this.errors.push(`Invalid token reference in ${filePath}: ${ref} at ${path}`);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      Object.entries(obj).forEach(([key, value]) => {
        this.checkReferences(value, allTokens, filePath, `${path}.${key}`);
      });
    }
  }

  private validateTokenNaming(files: TokenFile[]): void {
    const validPattern = /^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$/;

    files.forEach(file => {
      Object.keys(file.tokens).forEach(key => {
        if (!validPattern.test(key)) {
          this.warnings.push(
            `Token name "${key}" in ${file.path} doesn't follow kebab-case convention`
          );
        }
      });
    });
  }

  private checkForDuplicates(files: TokenFile[]): void {
    const seen = new Map<string, string>();

    files.forEach(file => {
      Object.keys(file.tokens).forEach(key => {
        if (seen.has(key)) {
          this.errors.push(
            `Duplicate token "${key}" found in ${file.path} and ${seen.get(key)}`
          );
        } else {
          seen.set(key, file.path);
        }
      });
    });
  }

  private buildResult(): TokenValidation {
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✓ All token checks passed');
    } else {
      if (this.errors.length > 0) {
        console.log(`\n❌ Found ${this.errors.length} token error(s):\n`);
        this.errors.forEach(err => console.log(`  ❌ ${err}`));
      }
      if (this.warnings.length > 0) {
        console.log(`\n⚠️  Found ${this.warnings.length} token warning(s):\n`);
        this.warnings.forEach(warn => console.log(`  ⚠️  ${warn}`));
      }
    }

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}

if (require.main === module) {
  const checker = new TokenChecker();
  const result = checker.validate();
  process.exit(result.valid ? 0 : 1);
}
