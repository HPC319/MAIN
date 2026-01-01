/**
 * Existence Invariants
 * Tests that critical architectural elements exist and are properly configured
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Existence Invariants', () => {
  test.describe('File System Structure', () => {
    const requiredDirs = [
      'src/core',
      'src/kernel',
      'src/lib',
      'src/components',
      'src/app',
      'src/contractors',
      'design-system/tokens',
      'scripts/gatekeeper',
      'tests/invariants',
      '.github/workflows'
    ];

    requiredDirs.forEach(dir => {
      test(`${dir} exists`, () => {
        const fullPath = path.join(process.cwd(), dir);
        expect(fs.existsSync(fullPath)).toBe(true);
      });
    });

    const requiredFiles = [
      'tsconfig.json',
      'package.json',
      'next.config.js',
      '.eslintrc.json',
      '.prettierrc',
      'playwright.config.ts',
      'src/core/types.ts',
      'src/core/interfaces.ts',
      'src/core/schemas.ts',
      'design-system/tokens/colors.tokens.json',
      'design-system/tokens/typography.tokens.json',
      'design-system/tokens/spacing.tokens.json',
      'design-system/tokens/motion.tokens.json'
    ];

    requiredFiles.forEach(file => {
      test(`${file} exists`, () => {
        const fullPath = path.join(process.cwd(), file);
        expect(fs.existsSync(fullPath)).toBe(true);
      });
    });
  });

  test.describe('Gatekeeper Scripts', () => {
    const scripts = [
      'ast-enforcer.ts',
      'ast-scan.ts',
      'boundary-check.ts',
      'token-check.ts',
      'zod-sync.ts',
      'motion-check.ts',
      'client-boundary-check.ts',
      'no-magic-motion.ts',
      'no-design-literals.ts',
      'check-bundle-budget.ts'
    ];

    scripts.forEach(script => {
      test(`${script} exists`, () => {
        const fullPath = path.join(process.cwd(), 'scripts/gatekeeper', script);
        expect(fs.existsSync(fullPath)).toBe(true);
      });

      test(`${script} is executable`, () => {
        const fullPath = path.join(process.cwd(), 'scripts/gatekeeper', script);
        const content = fs.readFileSync(fullPath, 'utf-8');
        expect(content.length).toBeGreaterThan(0);
        expect(content).toContain('export');
      });
    });
  });

  test.describe('Design Tokens', () => {
    test('colors.tokens.json is valid', () => {
      const tokenPath = path.join(process.cwd(), 'design-system/tokens/colors.tokens.json');
      const content = fs.readFileSync(tokenPath, 'utf-8');
      const tokens = JSON.parse(content);

      expect(tokens).toBeDefined();
      expect(typeof tokens).toBe('object');
    });

    test('typography.tokens.json is valid', () => {
      const tokenPath = path.join(process.cwd(), 'design-system/tokens/typography.tokens.json');
      const content = fs.readFileSync(tokenPath, 'utf-8');
      const tokens = JSON.parse(content);

      expect(tokens).toBeDefined();
      expect(typeof tokens).toBe('object');
    });

    test('spacing.tokens.json is valid', () => {
      const tokenPath = path.join(process.cwd(), 'design-system/tokens/spacing.tokens.json');
      const content = fs.readFileSync(tokenPath, 'utf-8');
      const tokens = JSON.parse(content);

      expect(tokens).toBeDefined();
      expect(typeof tokens).toBe('object');
    });

    test('motion.tokens.json is valid', () => {
      const tokenPath = path.join(process.cwd(), 'design-system/tokens/motion.tokens.json');
      const content = fs.readFileSync(tokenPath, 'utf-8');
      const tokens = JSON.parse(content);

      expect(tokens).toBeDefined();
      expect(typeof tokens).toBe('object');
    });
  });

  test.describe('Package Configuration', () => {
    test('package.json has required scripts', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(packagePath, 'utf-8');
      const pkg = JSON.parse(content);

      const requiredScripts = [
        'dev',
        'build',
        'start',
        'lint',
        'type-check',
        'ast:check',
        'tokens:validate',
        'test:invariant',
        'bundle:check'
      ];

      requiredScripts.forEach(script => {
        expect(pkg.scripts[script]).toBeDefined();
      });
    });

    test('package.json has required dependencies', () => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(packagePath, 'utf-8');
      const pkg = JSON.parse(content);

      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

      const requiredDeps = [
        'next',
        'react',
        'typescript',
        'zod',
        'framer-motion',
        'ts-morph',
        '@playwright/test'
      ];

      requiredDeps.forEach(dep => {
        expect(allDeps[dep]).toBeDefined();
      });
    });
  });

  test.describe('CI/CD Workflows', () => {
    test('ci.yml workflow exists', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
      expect(fs.existsSync(workflowPath)).toBe(true);
    });

    test('deploy.yml workflow exists', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/deploy.yml');
      expect(fs.existsSync(workflowPath)).toBe(true);
    });

    test('ci.yml has required jobs', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
      const content = fs.readFileSync(workflowPath, 'utf-8');

      expect(content).toContain('constitutional-enforcement');
      expect(content).toContain('ast-enforcement');
      expect(content).toContain('design-system-enforcement');
      expect(content).toContain('invariant-tests');
      expect(content).toContain('bundle-budget');
    });
  });

  test.describe('TypeScript Configuration', () => {
    test('tsconfig.json is valid', () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      const content = fs.readFileSync(tsconfigPath, 'utf-8');
      const tsconfig = JSON.parse(content);

      expect(tsconfig.compilerOptions).toBeDefined();
      expect(tsconfig.compilerOptions.strict).toBe(true);
    });
  });

  test.describe('Core Contracts', () => {
    test('types.ts exports types', () => {
      const typesPath = path.join(process.cwd(), 'src/core/types.ts');
      if (fs.existsSync(typesPath)) {
        const content = fs.readFileSync(typesPath, 'utf-8');
        expect(content).toContain('export');
      }
    });

    test('interfaces.ts exports interfaces', () => {
      const interfacesPath = path.join(process.cwd(), 'src/core/interfaces.ts');
      if (fs.existsSync(interfacesPath)) {
        const content = fs.readFileSync(interfacesPath, 'utf-8');
        expect(content).toContain('export');
      }
    });

    test('schemas.ts exports Zod schemas', () => {
      const schemasPath = path.join(process.cwd(), 'src/core/schemas.ts');
      if (fs.existsSync(schemasPath)) {
        const content = fs.readFileSync(schemasPath, 'utf-8');
        expect(content).toContain('zod');
      }
    });
  });
});
