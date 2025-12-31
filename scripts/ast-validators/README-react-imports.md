# React 19 Import Governance - AST Validator

## 🎯 Mission
Enforce React 19 import compliance across the entire codebase with **ZERO TOLERANCE** for violations.

## 📋 Validation Rules

### ❌ ILLEGAL (React 19 violations)
```typescript
import React from "react";  // DEFAULT IMPORT - FORBIDDEN
```

### ✅ LEGAL (React 19 compliant)
```typescript
// Named imports
import { useState, useEffect } from "react";

// Type imports
import type { FC, ReactNode, ComponentProps } from "react";

// Mixed imports
import { useState, type ReactNode } from "react";
```

## 🔍 Detection Logic

The validator performs intelligent AST analysis:

1. **Scan**: Recursively finds all `.ts` and `.tsx` files in `src/`
2. **Parse**: Uses Babel parser to create Abstract Syntax Tree
3. **Detect**: Identifies `import React from "react"` patterns
4. **Analyze**: Checks if React namespace is actually used (e.g., `React.FC`, `React.memo`)
5. **Classify Violations**:
   - **Type 1**: Unnecessary default imports (React namespace NOT used) → **DELETE**
   - **Type 2**: Should use type imports (React namespace IS used) → **CONVERT** to `import type { ... }`

## 🚀 Usage

### Command Line
```bash
# Run validator
npm run validate:react-imports

# Or directly with tsx
tsx scripts/ast-validators/validate-react-imports.ts
```

### Exit Codes
- `0`: Clean - No violations detected
- `1`: Violations found - Build should fail

## 📊 Output Format

### Clean State
```
╔════════════════════════════════════════════════════════════════╗
║          REACT 19 IMPORT GOVERNANCE - VALIDATION REPORT       ║
╚════════════════════════════════════════════════════════════════╝

Files Scanned: 247/247
Violations Found: 0

✓ SUCCESS - No React import violations detected!
All imports comply with React 19 standards.
```

### Violations Detected
```
╔════════════════════════════════════════════════════════════════╗
║          REACT 19 IMPORT GOVERNANCE - VALIDATION REPORT       ║
╚════════════════════════════════════════════════════════════════╝

Files Scanned: 247/247
Violations Found: 5

✗ VIOLATIONS DETECTED

Type 1: Unnecessary Default Imports (3)
  ⚠ These imports should be REMOVED completely

  1. src/components/ui/Button.tsx:1:0
     Found: import React from "react";
     Action: DELETE this line (React namespace not used)

Type 2: Should Use Type Imports (2)
  ⚠ These imports should be converted to specific type imports

  1. src/components/forms/FormField.tsx:1:0
     Found: import React from "react";
     Uses: React.FC, React.ReactNode
     Replace with: import type { FC, ReactNode } from "react";
```

## 🔧 Integration

### Package.json Scripts
```json
{
  "scripts": {
    "validate:react-imports": "tsx scripts/ast-validators/validate-react-imports.ts",
    "validate:all": "npm run validate:react-imports && tsx scripts/invariant-enforcer.ts"
  }
}
```

### CI/CD Workflow
```yaml
- name: React Import Governance
  run: npm run validate:react-imports
  
- name: Build
  run: npm run build
```

### Pre-commit Hook
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run validate:react-imports"
    }
  }
}
```

## 🏗️ Architecture

### Technology Stack
- **Parser**: `@babel/parser` with TypeScript + JSX plugins
- **Traversal**: `@babel/traverse` for AST walking
- **Type Detection**: Custom namespace usage analyzer

### File Structure
```
scripts/ast-validators/
├── validate-react-imports.ts    # Main validator (this file)
└── README-react-imports.md      # Documentation (this file)
```

### Key Functions

#### `findTsFiles(dir: string): string[]`
Recursively finds all TypeScript files, skipping build directories.

#### `detectReactNamespaceUsage(ast: any): string[]`
Analyzes AST to find React namespace usage patterns:
- `MemberExpression`: Detects `React.FC`, `React.memo`, etc.
- `TSQualifiedName`: Detects `React.FC` in type annotations

#### `validateFile(filePath: string): Violation | null`
Validates a single file, returns violation details or null.

#### `scanDirectory(srcDir: string): ScanResult`
Orchestrates the scan across all files in the directory.

#### `reportViolations(result: ScanResult): void`
Formats and displays violations with actionable recommendations.

## 🎨 Output Features

- **Color-coded output**: Red for violations, green for success, yellow for warnings
- **Progress indicators**: Shows scan progress for large codebases
- **Actionable recommendations**: Specific fix suggestions for each violation
- **Execution metrics**: Reports scan time and file counts
- **CI/CD friendly**: Clean exit codes and structured output

## 🔒 Enforcement Strategy

### Zero Tolerance Policy
- **Build-time**: Integrated into build scripts via `prebuild` hook
- **CI/CD**: Runs before all builds in GitHub Actions
- **Pre-commit**: Optional local validation before commit
- **Continuous**: Can be run manually at any time

### Remediation Path
1. **Automatic**: Run Phase 2 batch processor to auto-fix all violations
2. **Manual**: Follow specific recommendations in violation report
3. **Verification**: Re-run validator to confirm fixes

## 📈 Performance

- **Speed**: ~500-1000 files per second (depends on file complexity)
- **Memory**: Efficient streaming, minimal memory footprint
- **Scalability**: Handles large codebases (1000+ files)

## 🐛 Error Handling

- **Parse errors**: Logged as warnings, don't block scan
- **Missing files**: Gracefully handled with error reporting
- **Malformed imports**: Detected and reported with line numbers

## 🎯 Success Criteria

✅ **Clean State Achieved When:**
- All files scanned successfully
- Zero violations detected
- Exit code 0 returned
- Build can proceed

❌ **Violations Present When:**
- Any `import React from "react"` found
- Exit code 1 returned
- Build blocked until fixed

## 🔄 Maintenance

### Adding New Detection Patterns
Extend `detectReactNamespaceUsage()` function to catch new patterns.

### Updating Exclusions
Modify `skipDirs` array in `findTsFiles()` function.

### Customizing Output
Adjust color codes and formatting in `reportViolations()` function.

---

**Last Updated**: 2024-12-30
**Version**: 1.0.0
**Status**: ✅ Production Ready
**Enforcement**: 🔒 Active
