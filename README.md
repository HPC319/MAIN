# Canonstrata Design System

> Enterprise-grade design system with signature motion identity, invariant enforcement, and adaptive rendering.

[![Version](https://img.shields.io/badge/version-2.2.2-blue.svg)](https://github.com/canonstrata)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/canonstrata/actions)

## 🚀 Features

### Core Systems

- **🎯 Invariant Enforcement Layer** - System-level constraint guarantees
- **🎬 Signature Motion Identity** - Instantly recognizable animation patterns
- **⚡ Adaptive Rendering Modes** - Device-optimized rendering strategies
- **🧠 Form State Intelligence** - Smart form validation and state management
- **♿ Accessibility First** - WCAG 2.1 AA compliant
- **📊 Bundle Size Monitoring** - Automated size tracking and optimization
- **🔒 Storybook Gatekeeper** - CI-enforced component standards

### Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript 5.9** - Full type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12** - Advanced animations
- **Prisma 7** - Type-safe database ORM
- **Vitest** - Fast unit testing
- **Playwright** - E2E and visual testing
- **Storybook 10** - Component documentation

## 📦 Quick Start

### Prerequisites

- Node.js >= 20
- npm >= 10
- PostgreSQL (for database features)

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/canonstrata.git
cd canonstrata

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Generate Prisma client
npm run db:generate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development Scripts

### Development

```bash
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbo mode
npm run dev:https        # Start with HTTPS
```

### Building

```bash
npm run build            # Production build
npm run build:analyze    # Build with bundle analysis
npm run start            # Start production server
npm run start:prod       # Start production server on port 3000
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run typecheck        # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

### Testing

```bash
# Unit Tests
npm run test             # Run unit tests
npm run test:watch       # Watch mode
npm run test:ui          # Visual UI for tests
npm run test:coverage    # Generate coverage report
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests

# E2E Tests
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Interactive UI mode
npm run test:e2e:headed  # See browser
npm run test:e2e:debug   # Debug mode

# Visual Regression
npm run test:visual      # Run visual tests
npm run test:visual:update # Update snapshots

# Accessibility
npm run test:a11y        # All a11y tests
npm run test:a11y:axe    # Axe-core tests
npm run test:a11y:lighthouse # Lighthouse audit
```

### Storybook

```bash
npm run storybook        # Start Storybook dev server
npm run storybook:build  # Build Storybook
npm run storybook:test   # Run Storybook tests
npm run storybook:visual # Visual regression for stories
```

### Database

```bash
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations (production)
npm run db:migrate:dev   # Run migrations (development)
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database
npm run db:reset         # Reset database
```

### Monitoring

```bash
npm run monitor:bundle   # Analyze bundle size
npm run monitor:perf     # Performance metrics
npm run monitor:vitals   # Web Vitals tracking
npm run lighthouse       # Lighthouse audit
npm run lighthouse:ci    # Lighthouse CI audit
```

### Validation

```bash
npm run validate:invariants  # Check invariant enforcement
npm run validate:motion      # Validate motion system
npm run validate:forms       # Validate form intelligence
npm run validate:rendering   # Check rendering modes
```

### CI/CD

```bash
npm run ci:validate      # Run all validations
npm run ci:test          # Run all tests
npm run ci:build         # Full CI build
npm run ci:full          # Complete CI pipeline
npm run pre-commit       # Pre-commit validation
npm run pre-push         # Pre-push validation
```

### CLI Tools

```bash
npm run introspect                  # System introspection
npm run introspect:components       # Component analysis
npm run introspect:tokens           # Token analysis
npm run introspect:motion           # Motion system analysis
npm run introspect:forms            # Form intelligence analysis
npm run introspect:health           # Health check

npm run gatekeeper:check            # Check gatekeeper rules
npm run gatekeeper:ast              # AST validation
npm run gatekeeper:storybook        # Storybook validation
```

### Maintenance

```bash
npm run clean            # Clean build artifacts
npm run clean:artifacts  # Remove generated artifacts
npm run clean:all        # Deep clean (includes node_modules)
npm run check:deps       # Check for dependency updates
npm run check:security   # Security audit
```

## 📁 Project Structure

```
canonstrata/
├── .github/workflows/          # CI/CD pipelines
├── .storybook/                 # Storybook configuration
│   └── enforcement/            # Gatekeeper rules
├── cli/                        # CLI tools
│   └── canonstrata.js          # System introspection CLI
├── design-system/              # Design tokens & contracts
│   ├── tokens/                 # Design tokens
│   ├── motion/                 # Motion specifications
│   └── interaction-contracts/  # Interaction patterns
├── docs/                       # Documentation
├── prisma/                     # Database schema
├── public/                     # Static assets
├── scripts/                    # Build & utility scripts
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   └── motion/             # Motion components
│   ├── lib/                    # Libraries & utilities
│   │   ├── invariants/         # Invariant enforcement
│   │   ├── motion-identity/    # Motion system
│   │   ├── rendering/          # Adaptive rendering
│   │   ├── form-intelligence/  # Form intelligence
│   │   ├── a11y/               # Accessibility utilities
│   │   └── utils/              # General utilities
│   ├── styles/                 # Global styles
│   └── types/                  # TypeScript types
└── tests/                      # Test suites
    ├── e2e/                    # E2E tests
    └── visual/                 # Visual regression tests
```

## 🎨 Design System

### Design Tokens

Access design tokens via:

```typescript
import { colors, spacing, typography, motion } from '@/design-system/tokens';
```

### Component Usage

```typescript
import { Button, Input, Card } from '@/components/ui';

export default function Example() {
  return (
    <Card>
      <Input placeholder="Enter email" />
      <Button variant="primary" size="lg">
        Submit
      </Button>
    </Card>
  );
}
```

### Motion Identity

```typescript
import { 
  canostrataReveal, 
  canostrataDrawer,
  canostrataRipple 
} from '@/lib/motion-identity';

<motion.div {...canostrataReveal}>
  Content with signature reveal animation
</motion.div>
```

## 🧪 Testing

Comprehensive testing strategy with 85%+ coverage target:

- **Unit Tests** - Vitest for functions, hooks, utilities
- **Integration Tests** - Component interactions
- **E2E Tests** - Playwright for user workflows
- **Visual Regression** - Automated screenshot comparison
- **Accessibility Tests** - Axe-core + Lighthouse
- **Storybook Tests** - Component isolation testing

See [docs/TESTING.md](docs/TESTING.md) for details.

## 📊 Performance Targets

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTFB** (Time to First Byte): < 600ms

### Lighthouse Scores

- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 90+
- **SEO**: 90+

### Bundle Size

- **First Load JS**: < 200KB
- **Per Page**: < 100KB additional

## 🔒 Gatekeeper Rules

All components must pass these rules before merging:

1. ✅ Have a Storybook story
2. ✅ Use TypeScript with proper types
3. ✅ Define Props interface
4. ✅ Use forwardRef for refs
5. ✅ Have accessibility attributes
6. ✅ Use design tokens (CVA/Tailwind)
7. ✅ Have displayName
8. ✅ Export types

See [docs/STORYBOOK_GATEKEEPER.md](docs/STORYBOOK_GATEKEEPER.md) for details.

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
- `prisma/schema.prisma` - Database schema

## 🌐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (optional)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-password"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

See `.env.example` for all available variables.

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture and design
- [Testing](docs/TESTING.md) - Testing strategy and guidelines
- [CLI Usage](docs/CLI_USAGE.md) - CLI tool documentation
- [Storybook Gatekeeper](docs/STORYBOOK_GATEKEEPER.md) - Gatekeeper rules
- [Contributing](docs/CONTRIBUTING.md) - Contribution guidelines
- [Performance](docs/PERFORMANCE.md) - Performance optimization
- [Deployment](docs/DEPLOYMENT.md) - Deployment guide
- [File Structure](docs/FILE_STRUCTURE.md) - Directory structure

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Run linting (`npm run lint`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- TypeScript for all code
- ESLint + Prettier for formatting
- 85%+ test coverage
- Accessibility compliance
- Performance budgets
- Gatekeeper validation

## 🔐 Security

- Regular dependency audits (`npm run check:security`)
- Input validation with Zod
- CSRF protection via NextAuth
- SQL injection prevention via Prisma
- XSS protection in Next.js
- Environment variable security

## 📈 Monitoring

- Web Vitals tracking
- Bundle size monitoring
- Performance metrics
- Error tracking
- Lighthouse CI
- Automated accessibility audits

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- Core component library
- Design token system
- Basic testing infrastructure

### Phase 2: Enhancement ✅
- Motion identity system
- Invariant enforcement
- Storybook gatekeeper
- Form intelligence layer

### Phase 3: Excellence (Current)
- Complete test coverage
- Visual regression testing
- Performance optimization
- Production monitoring

### Phase 4: Scale (Next)
- Micro-frontend architecture
- Advanced analytics
- AI-powered insights
- Multi-theme support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible primitives
- Tailwind CSS for utility-first styling
- Framer Motion for animation library
- Vercel for hosting and deployment
- Open source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/canonstrata/issues)
- **Discussions**: [GitHub Discussions](https://github.com/canonstrata/discussions)
- **Email**: support@canonstrata.dev
- **Docs**: [Documentation](https://docs.canonstrata.dev)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ by the Canonstrata Team**
