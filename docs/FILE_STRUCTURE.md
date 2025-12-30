# File Structure

## Overview

This document provides a comprehensive guide to the Canonstrata project structure, explaining the purpose of each directory and key files.

## Root Directory

```
/Users/henryherrera/MAIN/
├── .env.example                    # Environment variables template
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore patterns
├── .prettierrc.json                # Prettier configuration
├── jest.config.ts                  # Jest configuration
├── jest.setup.ts                   # Jest setup file
├── lighthouserc.json               # Lighthouse CI configuration
├── LICENSE                         # MIT license
├── next.config.js                  # Legacy Next.js config
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── playwright.config.ts            # Playwright E2E test config
├── postcss.config.js               # PostCSS configuration
├── prisma.config.ts                # Prisma configuration
├── README.md                       # Project documentation
├── QUICK_REFERENCE.md              # Quick reference guide
├── schema.json                     # JSON schema definitions
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Key Root Files

**Configuration Files**:
- `.env.example` - Template for environment variables
- `tsconfig.json` - TypeScript compiler options
- `next.config.ts` - Next.js build and runtime configuration
- `tailwind.config.ts` - Design system tokens and Tailwind setup

**Package Management**:
- `package.json` - Project metadata, dependencies, and npm scripts
- `package-lock.json` - Locked versions for reproducible installs

**Quality Assurance**:
- `.eslintrc.json` - Code linting rules
- `.prettierrc.json` - Code formatting rules
- `jest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration

## Directory Structure

### `.github/`

GitHub-specific configuration and workflows.

```
.github/
└── workflows/
    └── ci.yml                      # CI/CD pipeline configuration
```

**Purpose**: Automates testing, building, and deployment via GitHub Actions.

---

### `.storybook/`

Storybook configuration for component documentation and testing.

```
.storybook/
├── enforcement/
│   └── gatekeeper.js               # Component validation rules
├── gatekeeper                      # Gatekeeper entry point
├── main.ts                         # Storybook configuration
├── preview.ts                      # Story preview configuration
├── preview-head.html               # Custom head tags
└── README.md                       # Storybook documentation
```

**Purpose**:
- `main.ts` - Configures Storybook addons and behavior
- `preview.ts` - Global decorators and parameters
- `enforcement/gatekeeper.js` - Enforces component standards

---

### `.vscode/`

VS Code editor configuration.

```
.vscode/
├── settings.json                   # Workspace settings
├── extensions.json                 # Recommended extensions
└── launch.json                     # Debug configurations
```

**Purpose**: Ensures consistent development environment across team.

---

### `cli/`

Command-line interface tools.

```
cli/
└── canonstrata.js                  # System introspection CLI
```

**Purpose**: Provides CLI commands for:
- System audits
- Component validation
- Coverage checks
- Token analysis
- Motion system inspection

**Usage**: `node cli/canonstrata.js <command>`

---

### `design-system/`

Design system tokens and specifications.

```
design-system/
├── index.ts                        # Main export
├── tokens/
│   ├── colors.ts                   # Color palette
│   ├── spacing.ts                  # Spacing scale
│   ├── typography.ts               # Type scale
│   ├── shadows.ts                  # Shadow tokens
│   ├── breakpoints.ts              # Responsive breakpoints
│   └── motion.ts                   # Animation tokens
├── motion/
│   ├── presets.ts                  # Motion presets
│   └── curves.ts                   # Easing curves
└── interaction-contracts/
    ├── button.ts                   # Button interactions
    ├── input.ts                    # Input interactions
    └── form.ts                     # Form interactions
```

**Purpose**:
- Single source of truth for design tokens
- Consistent values across components
- Type-safe token access

---

### `docs/`

Comprehensive project documentation.

```
docs/
├── TESTING.md                      # Testing strategy and guidelines
├── CLI_USAGE.md                    # CLI tool documentation
├── STORYBOOK_GATEKEEPER.md         # Gatekeeper rules and usage
├── ARCHITECTURE.md                 # System architecture
├── CONTRIBUTING.md                 # Contribution guidelines
├── FILE_STRUCTURE.md               # This file
├── DEPLOYMENT.md                   # Deployment guide
└── PERFORMANCE.md                  # Performance optimization
```

**Purpose**: Centralized documentation for developers and contributors.

---

### `prisma/`

Database schema and migrations.

```
prisma/
├── schema.prisma                   # Database schema definition
├── migrations/                     # Database migrations
│   └── [timestamp]_[name]/
│       └── migration.sql
└── seed.ts                         # Database seeding script
```

**Purpose**:
- `schema.prisma` - Defines database models and relationships
- `migrations/` - Version-controlled database changes
- `seed.ts` - Populates database with initial data

---

### `public/`

Static assets served directly by Next.js.

```
public/
├── favicon.ico                     # Site favicon
├── images/
│   ├── logo.svg
│   └── hero.png
├── fonts/
│   └── custom-font.woff2
└── manifest.json                   # PWA manifest
```

**Purpose**: Static files accessible at `/filename` URL path.

---

### `scripts/`

Build, validation, and utility scripts.

```
scripts/
├── ci-validate.ts                  # CI validation runner
├── clean-artifacts.ts              # Cleanup generated files
├── pre-commit-validate.ts          # Pre-commit hooks
├── check-bundle-size.js            # Bundle size checker
└── setup-monitoring.js             # Monitoring setup
```

**Purpose**:
- Automation scripts for CI/CD
- Development utilities
- Validation and enforcement
- Performance monitoring

---

### `src/`

Main application source code.

```
src/
├── app/                            # Next.js App Router
├── components/                     # React components
├── lib/                            # Libraries and utilities
├── styles/                         # Global styles
├── types/                          # TypeScript type definitions
├── utils/                          # Utility functions
├── adapters/                       # External service adapters
└── middleware.ts                   # Next.js middleware
```

---

### `src/app/`

Next.js App Router pages and layouts.

```
src/app/
├── layout.tsx                      # Root layout
├── page.tsx                        # Home page
├── globals.css                     # Global styles
├── (auth)/                         # Auth route group
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx                  # Dashboard layout
│   ├── page.tsx                    # Dashboard home
│   └── settings/
│       └── page.tsx
├── blog/
│   ├── page.tsx                    # Blog listing
│   └── [slug]/
│       └── page.tsx                # Blog post
└── api/                            # API routes
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts            # NextAuth handler
    ├── users/
    │   └── route.ts                # User API
    └── posts/
        └── route.ts                # Posts API
```

**Purpose**:
- File-based routing
- Server and Client Components
- API route handlers
- Layouts and templates

**Conventions**:
- `layout.tsx` - Shared layouts
- `page.tsx` - Route pages
- `route.ts` - API handlers
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `not-found.tsx` - 404 page

---

### `src/components/`

React component library.

```
src/components/
├── ui/                             # Base UI components
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   ├── Button.test.tsx
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   └── ...
├── forms/                          # Form components
│   ├── ContactForm.tsx
│   ├── LoginForm.tsx
│   └── SignupForm.tsx
├── layout/                         # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── Navigation.tsx
├── motion/                         # Motion components
│   ├── RevealOnScroll.tsx
│   ├── AnimatedCard.tsx
│   └── StaggerChildren.tsx
├── __tests__/                      # Component tests
│   ├── Button.test.tsx
│   └── Input.test.tsx
├── About/                          # About section
├── Auth/                           # Auth components
├── Blog/                           # Blog components
├── CallToAction/                   # CTA components
├── Clients/                        # Client logos
├── Common/                         # Common components
├── Contact/                        # Contact components
├── Faq/                            # FAQ components
├── Features/                       # Feature components
├── Footer/                         # Footer
├── Header/                         # Header
├── Hero/                           # Hero sections
├── NotFound/                       # 404 components
├── ScrollToTop/                    # Scroll to top
├── Team/                           # Team section
├── Testimonials/                   # Testimonials
└── index.ts                        # Component exports
```

**Component Structure**:
```
ComponentName/
├── index.tsx                       # Component implementation
├── ComponentName.tsx               # Alternative structure
├── ComponentName.stories.tsx       # Storybook stories
├── ComponentName.test.tsx          # Unit tests
├── ComponentName.module.css        # Scoped styles (if needed)
└── types.ts                        # Component types
```

---

### `src/lib/`

Core libraries and utilities.

```
src/lib/
├── invariants/                     # Invariant enforcement
│   ├── index.ts
│   ├── enforcer.ts
│   ├── rules.ts
│   └── validators.ts
├── motion-identity/                # Signature motion system
│   ├── index.ts
│   ├── presets.ts
│   ├── reveal.ts
│   ├── drawer.ts
│   ├── ripple.ts
│   ├── stagger.ts
│   ├── lift.ts
│   └── glow.ts
├── rendering/                      # Adaptive rendering
│   ├── index.ts
│   ├── modes.ts
│   ├── detector.ts
│   └── optimizer.ts
├── form-intelligence/              # Form intelligence
│   ├── index.ts
│   ├── validator.ts
│   ├── state-manager.ts
│   └── error-handler.ts
├── a11y/                           # Accessibility utilities
│   ├── index.ts
│   ├── focus-trap.ts
│   ├── announce.ts
│   └── keyboard-nav.ts
├── performance/                    # Performance utilities
│   ├── index.ts
│   ├── lazy-load.ts
│   └── prefetch.ts
├── hooks/                          # Custom React hooks
│   ├── useAuth.ts
│   ├── useForm.ts
│   ├── useMediaQuery.ts
│   └── useLocalStorage.ts
├── schemas/                        # Zod validation schemas
│   ├── user.ts
│   ├── post.ts
│   └── contact.ts
├── utils/                          # Utility functions
│   ├── cn.ts                       # Class name utility
│   ├── format.ts                   # Formatting utilities
│   └── date.ts                     # Date utilities
├── actions/                        # Server actions
│   ├── user.ts
│   └── post.ts
└── index.ts                        # Main export
```

**Purpose**:
- Core system functionality
- Reusable utilities
- Custom hooks
- Business logic

---

### `src/styles/`

Global styles and CSS modules.

```
src/styles/
├── globals.css                     # Global styles
├── variables.css                   # CSS variables
├── fonts.css                       # Font declarations
└── animations.css                  # Global animations
```

**Purpose**: Global styling and CSS configuration.

---

### `src/types/`

TypeScript type definitions.

```
src/types/
├── index.ts                        # Type exports
├── api.ts                          # API types
├── database.ts                     # Database types
├── components.ts                   # Component prop types
└── global.d.ts                     # Global type declarations
```

**Purpose**: Centralized type definitions for type safety.

---

### `tests/`

Test suites and test utilities.

```
tests/
├── e2e/                            # End-to-end tests
│   ├── auth.spec.ts
│   ├── navigation.spec.ts
│   └── forms.spec.ts
├── visual/                         # Visual regression tests
│   ├── components.spec.ts
│   └── pages.spec.ts
├── integration/                    # Integration tests
│   ├── api.test.ts
│   └── database.test.ts
├── mocks/                          # Test mocks
│   ├── handlers.ts                 # MSW handlers
│   └── data.ts                     # Mock data
└── fixtures/                       # Test fixtures
    └── users.json
```

**Purpose**: Comprehensive testing infrastructure.

---

## File Naming Conventions

### Components
- `PascalCase.tsx` - React components (Button.tsx)
- `PascalCase.stories.tsx` - Storybook stories
- `PascalCase.test.tsx` - Component tests

### Utilities
- `camelCase.ts` - Utility functions (formatDate.ts)
- `camelCase.test.ts` - Utility tests

### Hooks
- `useCamelCase.ts` - Custom hooks (useAuth.ts)

### Types
- `camelCase.ts` - Type definitions (user.ts)
- `global.d.ts` - Global declarations

### Configuration
- `lowercase.config.ts` - Config files (next.config.ts)
- `.lowercase` - Dot files (.eslintrc)

## Import Path Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/design-system/*": ["./design-system/*"]
    }
  }
}
```

**Usage**:
```typescript
// Instead of: '../../../components/ui/Button'
import { Button } from '@/components/ui/Button';

// Instead of: '../../lib/utils/cn'
import { cn } from '@/lib/utils/cn';
```

## Generated Files and Directories

**Do NOT commit these**:

```
.next/                              # Next.js build output
.turbo/                             # Turbo cache
node_modules/                       # Dependencies
coverage/                           # Test coverage reports
dist/                               # Distribution build
build/                              # Build artifacts
.storybook-build/                   # Storybook build
storybook-static/                   # Storybook static build
.vercel/                            # Vercel deployment
playwright-report/                  # Playwright test reports
test-results/                       # Test results
*.log                               # Log files
.env.local                          # Local environment
.DS_Store                           # macOS files
```

## Critical Files

### Must Not Delete
- `package.json` - Project configuration
- `tsconfig.json` - TypeScript settings
- `next.config.ts` - Next.js configuration
- `.gitignore` - Git ignore rules
- `prisma/schema.prisma` - Database schema
- `src/app/layout.tsx` - Root layout

### Must Not Commit
- `.env.local` - Local environment variables
- `node_modules/` - Dependencies
- `.next/` - Build output
- `*.log` - Log files

## Modifying Structure

### Adding New Component

1. Create component file: `src/components/ui/NewComponent.tsx`
2. Create story: `src/components/ui/NewComponent.stories.tsx`
3. Create test: `src/components/ui/NewComponent.test.tsx`
4. Export from: `src/components/ui/index.ts`

### Adding New Page

1. Create page: `src/app/new-page/page.tsx`
2. Optionally add layout: `src/app/new-page/layout.tsx`
3. Add loading state: `src/app/new-page/loading.tsx`
4. Add error boundary: `src/app/new-page/error.tsx`

### Adding New API Route

1. Create handler: `src/app/api/endpoint/route.ts`
2. Add validation schema: `src/lib/schemas/endpoint.ts`
3. Add tests: `tests/api/endpoint.test.ts`

### Adding New Library

1. Create directory: `src/lib/feature/`
2. Add implementation: `src/lib/feature/index.ts`
3. Add tests: `src/lib/feature/__tests__/`
4. Export from: `src/lib/index.ts`

## Documentation Files

All documentation in `docs/`:

- `TESTING.md` - Testing strategy
- `CLI_USAGE.md` - CLI documentation
- `STORYBOOK_GATEKEEPER.md` - Gatekeeper guide
- `ARCHITECTURE.md` - System architecture
- `CONTRIBUTING.md` - Contribution guide
- `FILE_STRUCTURE.md` - This file
- `DEPLOYMENT.md` - Deployment guide
- `PERFORMANCE.md` - Performance guide

## Quick Navigation

**Want to...**
- Add a component? → `src/components/ui/`
- Add a page? → `src/app/`
- Add a utility? → `src/lib/utils/`
- Add a hook? → `src/lib/hooks/`
- Add an API route? → `src/app/api/`
- Add tests? → `tests/`
- Add docs? → `docs/`
- Configure build? → `next.config.ts`
- Configure database? → `prisma/schema.prisma`

## Related Documentation

- [Architecture](./ARCHITECTURE.md) - System architecture
- [Contributing](./CONTRIBUTING.md) - Contribution guidelines
- [Testing](./TESTING.md) - Testing strategy

---

**Last Updated**: 2025-12-30
