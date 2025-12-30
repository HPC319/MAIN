# CANONSTRATA CONSTITUTIONAL CHARTER

## SYSTEM CLASSIFICATION

**TYPE:** Load-bearing architectural substrate  
**STATUS:** Immutable foundation  
**JURISDICTION:** All code, all dependencies, all runtime states

---

## ARTICLE I: IMMUTABILITY LAW

### Rule 1.1: Repository Purity
Only source-of-truth code may exist in version control.

**Enforcement:**  
`scripts/gatekeeper/immutability-check.ts`

**Mechanism:**  
- CI gate executes `git diff --exit-code`
- Scans for untracked files
- Scans for modified tracked files

**Failure Mode:**  
Build termination with file list of violations

**Violation Examples:**  
- Generated artifacts (dist/, .next/, build/)
- Temporary files (.DS_Store, *.log, *.tmp)
- Backup files (*.backup, *.old)
- Ad-hoc scripts or reports

---

### Rule 1.2: No Generated Artifacts
Build outputs must never be committed.

**Enforcement:**  
`.gitignore` + `scripts/gatekeeper/immutability-check.ts`

**Mechanism:**  
- .gitignore blocks artifact paths
- CI verification confirms no artifacts in git index

**Failure Mode:**  
Commit rejection, CI pipeline termination

---

## ARTICLE II: TOKEN ABSOLUTISM

### Rule 2.1: No Hardcoded Visual Properties
All color, spacing, typography must derive from design tokens.

**Enforcement:**  
`scripts/ast-validators/validate-tokens.ts`

**Mechanism:**  
- AST parsing of all TSX/JSX files
- Detection of inline styles
- Detection of non-token CSS classes
- Validation of token imports

**Failure Mode:**  
Build failure with file path and line number

**Violation Examples:**  
- `style={{ color: '#ffffff' }}`
- `className="text-[#fff]"`
- Raw pixel values without token reference

---

### Rule 2.2: No Bracketed Tailwind Literals
Arbitrary value syntax in Tailwind is prohibited.

**Enforcement:**  
`scripts/ast-validators/validate-no-tailwind-literals.ts`

**Mechanism:**  
- Regex scan for `[...]` patterns in className attributes
- AST validation of template literal expressions
- Detection of dynamic arbitrary values

**Failure Mode:**  
Build failure listing all violations with locations

**Violation Examples:**  
- `className="text-[#3b82f6]"`
- `className="w-[350px]"`
- `className="bg-[rgb(255,0,0)]"`

---

## ARTICLE III: TYPE ABSOLUTISM

### Rule 3.1: No Type Suppression
All TypeScript suppression directives are forbidden.

**Enforcement:**  
`.eslintrc.constitutional.json` + CI lint step

**Mechanism:**  
- ESLint ban on `@ts-ignore`
- ESLint ban on `@ts-nocheck`
- ESLint ban on `@ts-expect-error`
- ESLint ban on explicit `any` type

**Failure Mode:**  
Lint failure prevents CI progression

**Violation Examples:**  
- `// @ts-ignore`
- `const data: any = ...`
- Function parameters without types

---

### Rule 3.2: Strict Type Configuration
TypeScript must operate under maximum strictness.

**Enforcement:**  
`tsconfig.json` + compiler

**Mechanism:**  
- `strict: true`
- `noImplicitAny: true`
- `noUncheckedIndexedAccess: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`

**Failure Mode:**  
Compile-time type error, build termination

---

## ARTICLE IV: MOTION GOVERNANCE

### Rule 4.1: Kernel-Authorized Motion Only
Only motion approved by motion kernel may be imported.

**Enforcement:**  
`scripts/ast-validators/validate-motion.ts`

**Mechanism:**  
- Scans all imports from animation libraries
- Validates against motion kernel allowlist
- Detects unauthorized motion implementations

**Failure Mode:**  
Build failure with unauthorized import locations

**Violation Examples:**  
- Direct Framer Motion imports outside kernel
- Custom animation implementations
- CSS animation without kernel approval

---

### Rule 4.2: Reduced Motion Support Mandatory
All motion must respect `prefers-reduced-motion`.

**Enforcement:**  
`scripts/enforcement/motion-validator.ts`

**Mechanism:**  
- Runtime checks for motion implementation
- CSS validation for @media (prefers-reduced-motion)
- Accessibility compliance verification

**Failure Mode:**  
Runtime assertion error in development, CI failure in staging

---

## ARTICLE V: RENDERING BOUNDARIES

### Rule 5.1: Server Components Default
Components are server-rendered unless explicitly marked client.

**Enforcement:**  
`scripts/ast-validators/validate-rendering.ts`

**Mechanism:**  
- Scans for React hooks (useState, useEffect, etc.)
- Validates presence of "use client" directive
- Detects browser APIs in server components

**Failure Mode:**  
Build failure with component path and violation type

**Violation Examples:**  
- `useState` in file without "use client"
- `window` or `document` access in server component
- Event handlers without client boundary

---

### Rule 5.2: No Client Hooks in Server Context
Client-only APIs must remain in client components.

**Enforcement:**  
ESLint + `scripts/ast-validators/validate-rendering.ts`

**Mechanism:**  
- AST detection of React client hooks
- Validation of component context (server vs client)
- Import chain analysis

**Failure Mode:**  
Compile-time error with component stack trace

---

## ARTICLE VI: DEPENDENCY LAW

### Rule 6.1: Peer Dependency Compatibility
All peer dependencies must be compatible before installation.

**Enforcement:**  
`scripts/gatekeeper/dependency-preflight.ts`

**Mechanism:**  
- Parses package.json peerDependencies
- Validates installed versions against requirements
- Checks for version conflicts across dependency tree

**Failure Mode:**  
Pre-install failure with incompatibility report

**Violation Detection:**  
- Version range mismatches
- Missing peer dependencies
- Conflicting version constraints

---

### Rule 6.2: No Transient Dependencies
All dependencies must be explicitly declared.

**Enforcement:**  
CI dependency audit + package.json validation

**Mechanism:**  
- Validates all imports have corresponding dependencies
- No reliance on nested dependency hoisting
- Explicit version declarations only

**Failure Mode:**  
Build failure with missing dependency list

---

## ARTICLE VII: STRUCTURAL PROHIBITIONS

### Rule 7.1: No SaaS Coupling
Business logic must not depend on external SaaS platforms.

**Enforcement:**  
Code review + architectural validation

**Mechanism:**  
- Adapter pattern enforcement
- No direct SaaS SDK imports in core logic
- Isolation of external integrations

**Failure Mode:**  
Manual gate rejection, architectural review failure

**Allowed:**  
- Adapters in designated integration layer
- Environment-based provider switching
- Optional feature flags for SaaS features

**Prohibited:**  
- Direct CRM imports in business logic
- Hardcoded SaaS endpoints
- SaaS-specific data models in core types

---

### Rule 7.2: No Build-Time Secrets
Runtime configuration must not leak into build artifacts.

**Enforcement:**  
`scripts/enforcement/runtime-assertions.ts`

**Mechanism:**  
- Environment variable access tracking
- Build-time vs runtime context separation
- Static analysis of configuration imports

**Failure Mode:**  
Build failure with exposed secret references

---

## ARTICLE VIII: CI ENFORCEMENT CHAIN

### Sequential Gate Execution

**Gate 1: Dependency Preflight**  
`npm run gatekeeper:dependency`  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 2: Dependency Installation**  
`npm ci`  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 3: Immutability Verification**  
`npm run gatekeeper:immutability`  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 4: AST Validation**  
`npm run gatekeeper:ast`  
- Validates tokens
- Validates motion
- Validates rendering boundaries
- Validates no Tailwind literals  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 5: Constitutional Lint**  
`npm run lint:constitutional`  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 6: Type Compilation**  
`npm run build`  
↓ PASS → Continue | FAIL → HARD STOP

**Gate 7: Invariant Validation**  
`npm run validate:invariants`  
↓ PASS → Continue | FAIL → HARD STOP

---

## ARTICLE IX: RUNTIME ENFORCEMENT

### Rule 9.1: Configuration Validation
All required configuration must be validated at startup.

**Enforcement:**  
`scripts/enforcement/runtime-assertions.ts`

**Mechanism:**  
- Application initialization checks
- Environment variable validation
- Feature flag consistency verification

**Failure Mode:**  
Application refuses to start, error logged with missing config

---

### Rule 9.2: Token Structure Integrity
Design token structure must conform to schema at runtime.

**Enforcement:**  
`scripts/enforcement/validate-tokens.ts`

**Mechanism:**  
- JSON schema validation at application start
- Token completeness verification
- Type guard enforcement

**Failure Mode:**  
Runtime error with specific token path violation

---

## ARTICLE X: CONSTITUTIONAL AMENDMENTS

### Rule 10.1: No Amendments Permitted
This charter is immutable and cannot be modified.

**Enforcement:**  
Philosophy + architectural commitment

**Mechanism:**  
Constitutional clauses are embedded in build system, not configurable

**Rationale:**  
Discipline cannot be optional. The system enforces itself.

---

## ENFORCEMENT SCRIPT INDEX

| Enforcement Mechanism | File Path | Executed By |
|----------------------|-----------|-------------|
| Immutability Check | `scripts/gatekeeper/immutability-check.ts` | CI, pre-commit |
| Dependency Preflight | `scripts/gatekeeper/dependency-preflight.ts` | CI, pre-install |
| Token Validation | `scripts/ast-validators/validate-tokens.ts` | CI, pre-commit |
| Tailwind Literal Ban | `scripts/ast-validators/validate-no-tailwind-literals.ts` | CI, pre-commit |
| Motion Validation | `scripts/ast-validators/validate-motion.ts` | CI, pre-commit |
| Rendering Validation | `scripts/ast-validators/validate-rendering.ts` | CI, pre-commit |
| Type Absolutism | `.eslintrc.constitutional.json` | CI, pre-commit |
| Runtime Assertions | `scripts/enforcement/runtime-assertions.ts` | Application startup |
| Installation Verification | `scripts/enforcement/verify-installation.ts` | Post-install |

---

## FAILURE MODE TAXONOMY

### Class A: Pre-Commit Failure
**Trigger:** Local validation failure  
**Response:** Commit blocked, developer notified  
**Recovery:** Fix violation, re-run validation

### Class B: CI Gate Failure
**Trigger:** Any gate in CI sequence fails  
**Response:** Pipeline terminates immediately  
**Recovery:** Fix violation, push corrected code

### Class C: Build Failure
**Trigger:** Compilation or bundling error  
**Response:** Build artifacts not generated  
**Recovery:** Resolve type errors or AST violations

### Class D: Runtime Failure
**Trigger:** Configuration or token validation error  
**Response:** Application refuses to start  
**Recovery:** Correct configuration, redeploy

---

## SYSTEM GUARANTEES

**GUARANTEE 1: Structural Integrity**  
If the build succeeds, the application conforms to all constitutional rules.

**GUARANTEE 2: Immutability**  
The foundation cannot be compromised by developer discipline failures.

**GUARANTEE 3: Forward Compatibility**  
All future code must comply with existing constitutional law.

**GUARANTEE 4: Zero Trust**  
The system assumes malicious or careless actors and refuses invalid code automatically.

---

## FINAL STATEMENT

CanonStrata is not a codebase requiring maintenance.  
CanonStrata is not a framework requiring updates.  
CanonStrata is not a project requiring discipline.

**CanonStrata is a self-enforcing constitutional system.**

Trust is no longer required.  
Discipline is no longer assumed.  
The system enforces itself.

This is load-bearing architecture.  
This is irreversible.  
This is law.
