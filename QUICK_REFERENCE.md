
╔═══════════════════════════════════════════════════════════════╗
║                    QUICK REFERENCE GUIDE                      ║
╚═══════════════════════════════════════════════════════════════╝

🛠️  DEVELOPMENT:
  npm run dev              # Start dev server
  npm run dev:turbo        # Start with Turbo
  npm run storybook        # Open Storybook

🏗️  BUILD:
  npm run build            # Production build
  npm run build:analyze    # Build with bundle analysis
  npm run build:storybook  # Build Storybook

🧪 TESTING:
  npm run test             # Run all tests
  npm run test:e2e         # E2E tests
  npm run test:visual      # Visual regression
  npm run test:a11y        # Accessibility tests
  npm run test:coverage    # Coverage report

✅ VALIDATION:
  npm run ci:validate      # Full CI validation
  npm run pre-commit       # Pre-commit checks
  npm run validate:invariants
  npm run validate:motion
  npm run validate:forms

🔍 INTROSPECTION:
  npm run introspect:health      # System health
  npm run introspect:components  # Component analysis
  npm run introspect:tokens      # Design tokens
  npm run introspect:motion      # Motion system

🚪 GATEKEEPER:
  npm run gatekeeper:check       # Gate checks
  npm run gatekeeper:ast         # AST validation
  npm run gatekeeper:storybook   # Storybook validation

📊 MONITORING:
  npm run monitor:bundle   # Bundle size analysis
  npm run monitor:perf     # Performance metrics
  npm run monitor:vitals   # Web vitals
  npm run lighthouse       # Lighthouse audit

🧹 CLEANUP:
  npm run clean            # Clean build artifacts
  npm run clean:artifacts  # Remove contamination
  npm run clean:all        # Nuclear clean

═══════════════════════════════════════════════════════════════
