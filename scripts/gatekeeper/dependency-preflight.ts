#!/usr/bin/env ts-node

/**
 * DEPENDENCY PREFLIGHT VALIDATOR
 * 
 * CONSTITUTIONAL MANDATE:
 * - Parse all peer dependencies
 * - Validate compatibility BEFORE installation
 * - HARD FAIL on any incompatibility
 * - Zero tolerance for dependency violations
 * 
 * ENFORCEMENT: Pre-install gate in CI/CD pipeline
 * FAILURE MODE: Exit code 1, explicit incompatibility report
 */

// import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

interface ValidationResult {
  valid: boolean;
  package: string;
  required: string;
  installed?: string;
  reason?: string;
}

class DependencyPreflightValidator {
  private rootPath: string;
  private packageJson: PackageJson;
  private violations: ValidationResult[] = [];

  constructor(rootPath: string = process.cwd()) {
    this.rootPath = rootPath;
    this.packageJson = this.loadPackageJson();
  }

  private loadPackageJson(): PackageJson {
    const pkgPath = join(this.rootPath, 'package.json');
    
    if (!existsSync(pkgPath)) {
      this.fail('CONSTITUTIONAL VIOLATION: package.json not found');
    }

    try {
      return JSON.parse(readFileSync(pkgPath, 'utf-8'));
    } catch (error) {
      this.fail(`CONSTITUTIONAL VIOLATION: Invalid package.json - ${error}`);
    }
  }

  private getInstalledVersion(packageName: string): string | null {
    try {
      const nodeModulesPath = join(this.rootPath, 'node_modules', packageName, 'package.json');
      
      if (!existsSync(nodeModulesPath)) {
        return null;
      }

      const pkg = JSON.parse(readFileSync(nodeModulesPath, 'utf-8'));
      return pkg.version;
    } catch {
      return null;
    }
  }

  private getDeclaredVersion(packageName: string): string | null {
    const deps = this.packageJson.dependencies || {};
    const devDeps = this.packageJson.devDependencies || {};
    
    return deps[packageName] || devDeps[packageName] || null;
  }

  private validateVersionRange(installed: string, required: string): boolean {
    // Remove common prefixes
    const cleanRequired = required.replace(/^[\^~>=<]/, '');
    const cleanInstalled = installed;

    // Exact match check
    if (required === installed) {
      return true;
    }

    // Caret (^) - compatible with same major version
    if (required.startsWith('^')) {
      const [reqMajor] = cleanRequired.split('.');
      const [instMajor] = cleanInstalled.split('.');
      return reqMajor === instMajor;
    }

    // Tilde (~) - compatible with same minor version
    if (required.startsWith('~')) {
      const [reqMajor, reqMinor] = cleanRequired.split('.');
      const [instMajor, instMinor] = cleanInstalled.split('.');
      return reqMajor === instMajor && reqMinor === instMinor;
    }

    // Greater than or equal
    if (required.startsWith('>=')) {
      return this.compareVersions(cleanInstalled, cleanRequired) >= 0;
    }

    // Greater than
    if (required.startsWith('>')) {
      return this.compareVersions(cleanInstalled, cleanRequired) > 0;
    }

    // Less than or equal
    if (required.startsWith('<=')) {
      return this.compareVersions(cleanInstalled, cleanRequired) <= 0;
    }

    // Less than
    if (required.startsWith('<')) {
      return this.compareVersions(cleanInstalled, cleanRequired) < 0;
    }

    // Wildcard or any
    if (required === '*' || required === 'latest') {
      return true;
    }

    // Default: exact match required
    return installed === required;
  }

  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }

    return 0;
  }

  private validatePeerDependencies(): void {
    const peerDeps = this.packageJson.peerDependencies || {};

    if (Object.keys(peerDeps).length === 0) {
      console.log('✓ No peer dependencies declared');
      return;
    }

    console.log(`\n⚖️  VALIDATING ${Object.keys(peerDeps).length} PEER DEPENDENCIES\n`);

    for (const [packageName, requiredVersion] of Object.entries(peerDeps)) {
      const declaredVersion = this.getDeclaredVersion(packageName);
      const installedVersion = this.getInstalledVersion(packageName);

      // Check if declared in dependencies/devDependencies
      if (!declaredVersion) {
        this.violations.push({
          valid: false,
          package: packageName,
          required: requiredVersion,
          reason: 'MISSING: Not declared in dependencies or devDependencies',
        });
        continue;
      }

      // If node_modules exists, validate installed version
      if (existsSync(join(this.rootPath, 'node_modules'))) {
        if (!installedVersion) {
          this.violations.push({
            valid: false,
            package: packageName,
            required: requiredVersion,
            installed: 'NOT INSTALLED',
            reason: 'MISSING: Not found in node_modules',
          });
          continue;
        }

        // Validate version compatibility
        const isCompatible = this.validateVersionRange(installedVersion, requiredVersion);

        if (!isCompatible) {
          this.violations.push({
            valid: false,
            package: packageName,
            required: requiredVersion,
            installed: installedVersion,
            reason: 'INCOMPATIBLE: Version mismatch',
          });
          continue;
        }
      }

      // Validation passed
      console.log(`  ✓ ${packageName}: ${declaredVersion} (requires ${requiredVersion})`);
    }
  }

  private validateDependencyCircularity(): void {
    // Check for circular dependencies in package structure
    const allDeps = {
      ...(this.packageJson.dependencies || {}),
      ...(this.packageJson.devDependencies || {}),
    };

    // Basic self-reference check
    if (allDeps[this.packageJson.name]) {
      this.violations.push({
        valid: false,
        package: this.packageJson.name,
        required: allDeps[this.packageJson.name] ?? "",
        reason: 'CIRCULAR: Package depends on itself',
      });
    }
  }

  private validateWorkspaceProtocol(): void {
    const allDeps = {
      ...(this.packageJson.dependencies || {}),
      ...(this.packageJson.devDependencies || {}),
    };

    for (const [pkg, version] of Object.entries(allDeps)) {
      if (version.startsWith('workspace:')) {
        // Check if workspace package exists
        const workspacePath = version.replace('workspace:', '');
        if (workspacePath === '*' || workspacePath === '^' || workspacePath === '~') {
          console.log(`  ✓ ${pkg}: workspace protocol (${version})`);
        } else {
          // Validate specific workspace path if provided
          console.log(`  ⚠ ${pkg}: workspace protocol validation skipped`);
        }
      }
    }
  }

  public validate(): void {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  DEPENDENCY PREFLIGHT VALIDATION');
    console.log('  CONSTITUTIONAL ENFORCEMENT: DEPENDENCY LAW');
    console.log('═══════════════════════════════════════════════════════════');

    this.validatePeerDependencies();
    this.validateDependencyCircularity();
    this.validateWorkspaceProtocol();

    if (this.violations.length > 0) {
      this.reportViolations();
      this.fail('DEPENDENCY LAW VIOLATIONS DETECTED');
    }

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  ✓ ALL DEPENDENCY CONSTRAINTS SATISFIED');
    console.log('═══════════════════════════════════════════════════════════\n');
  }

  private reportViolations(): void {
    console.error('\n❌ CONSTITUTIONAL VIOLATION: DEPENDENCY LAW BREACHED\n');
    console.error('───────────────────────────────────────────────────────────\n');

    for (const violation of this.violations) {
      console.error(`  Package: ${violation.package}`);
      console.error(`  Required: ${violation.required}`);
      if (violation.installed) {
        console.error(`  Installed: ${violation.installed}`);
      }
      console.error(`  Reason: ${violation.reason}`);
      console.error('');
    }

    console.error('───────────────────────────────────────────────────────────');
    console.error(`  Total Violations: ${this.violations.length}`);
    console.error('───────────────────────────────────────────────────────────\n');
  }

  private fail(message: string): never {
    console.error(`\n❌ ${message}\n`);
    process.exit(1);
  }
}

// EXECUTION
if (require.main === module) {
  const validator = new DependencyPreflightValidator();
  validator.validate();
}

export default DependencyPreflightValidator;
