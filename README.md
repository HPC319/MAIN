CANONSTRATA CONSTITUTIONAL CHARTER v1.0
SYSTEM CLASSIFICATION

TYPE: Load-bearing architectural substrate
STATUS: Immutable foundation
JURISDICTION: All code, all dependencies, all runtime states

CanonStrata is not a framework, stack, toolkit, template, theme, or library.
CanonStrata is a constitutional system that refuses invalid code.

ARTICLE I — IMMUTABILITY LAW
Rule 1.1 — Repository Purity

Only source-of-truth code may exist in version control.

Enforcement:
scripts/gatekeeper/immutability-check.ts

Mechanism:

CI executes git diff --exit-code

Scans for untracked files

Scans for modified tracked files

Failure Mode:
Immediate build termination with a list of violating files.

Violations Include:

Generated artifacts (dist/, .next/, build/)

Temporary files (.DS_Store, *.log, *.tmp)

Backups (*.old, *.backup)

Ad-hoc scripts or reports

Rule 1.2 — No Generated Artifacts

Build outputs must never be committed.

Enforcement:
.gitignore + immutability gate

Failure Mode:
Commit rejection and CI termination.

ARTICLE II — TOKEN ABSOLUTISM
Rule 2.1 — No Hardcoded Visual Properties

All color, spacing, typography, and layout values must derive from design tokens.

Enforcement:
scripts/ast-validators/validate-tokens.ts

Mechanism:

AST scan of all TS/TSX

Detection of inline styles

Detection of non-token CSS

Validation of token imports

Failure Mode:
Build failure with file path and line number.

Rule 2.2 — No Tailwind Arbitrary Literals

Bracketed Tailwind syntax is forbidden.

Enforcement:
scripts/ast-validators/validate-no-tailwind-literals.ts

Failure Mode:
Build failure listing all violations.

Examples (Forbidden):

className="w-[350px]"

className="text-[#fff]"

ARTICLE III — TYPE ABSOLUTISM
Rule 3.1 — No Type Suppression

TypeScript suppression is forbidden.

Enforcement:
.eslintrc.constitutional.json

Banned:

@ts-ignore

@ts-nocheck

@ts-expect-error

any

Failure Mode:
Lint failure blocks CI.

Rule 3.2 — Maximum Strictness

TypeScript must run at full strictness.

Required:

strict: true

noImplicitAny: true

noUncheckedIndexedAccess: true

noUnusedLocals: true

noUnusedParameters: true

Failure Mode:
Compile failure.

ARTICLE IV — MOTION GOVERNANCE
Rule 4.1 — Kernel-Authorized Motion Only

Only motion defined in the CanonStrata motion kernel is permitted.

Enforcement:
scripts/ast-validators/validate-motion.ts

Failure Mode:
Build failure with unauthorized import locations.

Rule 4.2 — Reduced Motion Mandatory

All motion must respect prefers-reduced-motion.

Enforcement:
scripts/enforcement/motion-validator.ts

Failure Mode:

Runtime refusal in development

CI failure in staging

ARTICLE V — RENDERING BOUNDARIES
Rule 5.1 — Server Components Default

Components are server-rendered unless explicitly marked "use client".

Enforcement:
scripts/ast-validators/validate-rendering.ts

Violations Include:

React hooks without "use client"

Browser APIs in server components

Rule 5.2 — Client Isolation

Client-only APIs may not appear in server context.

Failure Mode:
Compile-time error with import chain trace.

ARTICLE VI — DEPENDENCY LAW
Rule 6.1 — Peer Compatibility Preflight

All peer dependencies must be compatible before installation.

Enforcement:
scripts/gatekeeper/dependency-preflight.ts

Failure Mode:
Pre-install refusal with incompatibility report.

Rule 6.2 — Explicit Dependencies Only

No reliance on transitive or hoisted dependencies.

Failure Mode:
Build failure with missing dependency list.

ARTICLE VII — STRUCTURAL PROHIBITIONS
Rule 7.1 — No SaaS Coupling

Core logic must not depend on SaaS platforms.

Allowed:

Adapter interfaces

Provider isolation

Prohibited:

Direct CRM imports

Billing systems

SaaS-specific data models

Rule 7.2 — No Build-Time Secrets

Secrets may not leak into build artifacts.

Enforcement:
scripts/enforcement/runtime-assertions.ts

Failure Mode:
Build refusal.

ARTICLE VIII — CI JUDICIARY

CI gates execute sequentially with no exceptions:

Dependency Preflight

npm ci

Immutability Check

AST Validation

Constitutional Lint

Type Compilation

Invariant Validation

Any failure terminates the pipeline immediately.

ARTICLE IX — RUNTIME ENFORCEMENT
Rule 9.1 — Configuration Validation

All required configuration must be present at startup.

Failure Mode:
Application refuses to start.

Rule 9.2 — Token Integrity

Design tokens must conform to schema at runtime.

Failure Mode:
Runtime error with precise token path.

ARTICLE X — AMENDMENTS
Rule 10.1 — No Amendments

This constitution is immutable.

Rationale:
Discipline cannot be optional.
The system enforces itself.

FAILURE MODE TAXONOMY

Class A: Pre-commit refusal

Class B: CI termination

Class C: Build failure

Class D: Runtime refusal

SYSTEM GUARANTEES

If the build succeeds, the system is constitutionally valid.

The foundation cannot drift.

All future code must obey existing law.

Zero trust is assumed.

FINAL STATEMENT

CanonStrata is not maintained.
CanonStrata is not updated.
CanonStrata is not explained.

CanonStrata is enforced.

This is load-bearing architecture.
This is irreversible.
This is law.
