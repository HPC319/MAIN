# Next.js 16 Enterprise Application - v1.0.0

**Production-Ready** | **Accessible** | **Performant** | **Type-Safe**

A modern, enterprise-grade Next.js 16 application built with React 19, featuring a comprehensive design system, form validation infrastructure, motion governance, and full accessibility compliance.

---

## ✨ Features

### 🎨 Design System
- **Atomic Design Tokens** - Colors, typography, spacing, border-radius
- **Semantic Color System** - Light/dark mode with consistent theming
- **Motion System** - Framer Motion with accessibility controls
- **Interaction Contracts** - Standardized hover, focus, press, and keyboard states

### 📋 Forms & Validation
- **React Hook Form** - Performant form management
- **Zod Schemas** - Type-safe validation
- **Server Actions** - Next.js 16 server-side form handling
- **Multi-Step Forms** - Complex form flows with state management

### ♿ Accessibility
- **WCAG AA Compliant** - Meets international accessibility standards
- **Keyboard Navigation** - Full keyboard support throughout
- **Screen Reader Optimized** - Proper ARIA labels and live regions
- **Color Contrast** - All combinations meet 4.5:1 minimum ratio
- **Reduced Motion Support** - Respects user preferences

### 🚀 Performance
- **Image Optimization** - Next.js Image component with lazy loading
- **Font Optimization** - Self-hosted fonts with next/font
- **Code Splitting** - Automatic route-based splitting
- **Server Components** - Reduced JavaScript bundle size
- **Suspense Boundaries** - Progressive loading states

### 🧪 Quality Assurance
- **TypeScript** - 100% type coverage
- **ESLint** - Consistent code style
- **Prettier** - Automated formatting
- **CI/CD Pipeline** - GitHub Actions with automated testing
- **Lighthouse CI** - Performance and accessibility audits

---

## 📦 Tech Stack

### Core
- **Next.js 16.1.1** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.18** - Utility-first CSS

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Select, Accordion, Tooltip
- **Shadcn/ui** - Re-usable component library
- **Framer Motion 12.23.26** - Animation library
- **Lucide React** - Icon library

### Forms & Validation
- **React Hook Form 7.69.0** - Form management
- **Zod 4.2.1** - Schema validation
- **@hookform/resolvers** - Zod integration

### Database & Auth
- **Prisma 7.0.1** - ORM and database toolkit
- **NextAuth 4.24.13** - Authentication
- **Bcrypt** - Password hashing

### Development Tools
- **Storybook 10.1.11** - Component documentation
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Lighthouse CI** - Performance auditing

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- npm or yarn
- PostgreSQL database (or other Prisma-supported DB)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MAIN

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure your database URL in .env.local
# DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run db:studio        # Open Prisma Studio (database GUI)
npm run storybook        # Start Storybook on port 6006
```

### Building
```bash
npm run build            # Production build
npm start                # Start production server
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run ci:all           # Run all CI checks (lint + typecheck + build)
```

### Database
```bash
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema changes to database
npm run db:migrate       # Run production migrations
npm run db:studio        # Open Prisma Studio
```

### Testing & Auditing
```bash
npm test                 # Run tests (when configured)
npm run lighthouse       # Run Lighthouse CI audit
npm run build-storybook  # Build Storybook for deployment
```

---

## 📁 Project Structure

```
MAIN/
├── .github/
│   └── workflows/
│       └── ci.yml                     # CI/CD pipeline
├── .storybook/                        # Storybook configuration
│   └── stories/                       # Component stories
├── design-system/                     # Design system foundation
│   ├── tokens/
│   │   ├── colors.ts                  # Color tokens
│   │   ├── typography.ts              # Typography scale
│   │   ├── spacing.ts                 # Spacing scale
│   │   └── border-radius.ts           # Border radius tokens
│   ├── motion/
│   │   ├── config.ts                  # Motion configuration
│   │   └── presets.ts                 # Animation presets
│   └── interaction-contracts/
│       ├── hover.ts                   # Hover states
│       ├── focus.ts                   # Focus states
│       ├── press.ts                   # Press/active states
│       └── keyboard.ts                # Keyboard navigation
├── prisma/
│   └── schema.prisma                  # Database schema
├── public/                            # Static assets
│   └── images/                        # Optimized images
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   ├── (site)/                    # Site routes
│   │   └── api/                       # API routes
│   ├── components/
│   │   ├── ui/                        # Shadcn/Radix primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── motion/                    # Motion components
│   │   │   ├── fade-in.tsx
│   │   │   └── motion-wrapper.tsx
│   │   ├── forms/                     # Complex form components
│   │   │   ├── multi-step-form.tsx
│   │   │   └── lead-intake-flow.tsx
│   │   ├── layout/                    # Layout components
│   │   ├── Hero/                      # Hero section
│   │   ├── Footer/                    # Footer
│   │   ├── Header/                    # Header/nav
│   │   ├── Auth/                      # Authentication
│   │   └── ...                        # Other components
│   ├── lib/
│   │   ├── actions/                   # Server Actions
│   │   │   └── form-actions.ts
│   │   ├── schemas/                   # Zod schemas
│   │   │   ├── contact-schema.ts
│   │   │   └── auth-schema.ts
│   │   ├── hooks/                     # Custom React hooks
│   │   └── utils/                     # Utility functions
│   ├── styles/                        # Global styles
│   ├── types/                         # TypeScript types
│   └── utils/                         # Utility functions
├── .env.example                       # Example environment variables
├── .eslintrc.json                     # ESLint configuration
├── .prettierrc.json                   # Prettier configuration
├── lighthouserc.json                  # Lighthouse CI config
├── next.config.ts                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies and scripts
├── PROJECT_STATUS.md                  # Implementation status
├── DEPLOYMENT_CHECKLIST.md            # Pre-deployment checklist
└── README.md                          # This file
```

---

## 🎨 Design System

### Color Tokens
Located in `design-system/tokens/colors.ts`, the color system includes:
- **Brand colors** - Primary, secondary, accent
- **Neutral colors** - Gray scale for UI elements
- **Semantic colors** - Success, warning, error, info
- **Light/Dark modes** - Automatic theme switching

Usage:
```tsx
import { colors } from '@/design-system/tokens/colors';

// In Tailwind
<div className="bg-brand-primary text-neutral-50" />

// In JavaScript
const primaryColor = colors.brand.primary;
```

### Motion System
Located in `design-system/motion/`, includes:
- **Duration scales** - fast (150ms), normal (300ms), slow (500ms)
- **Easing functions** - ease, easeIn, easeOut, easeInOut
- **Presets** - fadeIn, slideIn, scaleIn, stagger

Usage:
```tsx
import { MotionWrapper } from '@/components/motion/motion-wrapper';
import { fadeIn } from '@/design-system/motion/presets';

<MotionWrapper preset={fadeIn}>
  <YourComponent />
</MotionWrapper>
```

### Interaction Contracts
Standardized interaction patterns:
- **Hover** - Smooth color/transform transitions
- **Focus** - Keyboard-visible focus indicators
- **Press** - Active state feedback
- **Keyboard** - Arrow navigation, Enter/Space activation

---

## 📋 Form Handling

### Basic Form Example
```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schemas/contact-schema';
import { submitContactForm } from '@/lib/actions/form-actions';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    await submitContactForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Name"
        error={errors.name?.message}
        {...register('name')}
      />
      
      <FormField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
}
```

### Creating New Schemas
```tsx
// src/lib/schemas/my-schema.ts
import { z } from 'zod';

export const mySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older'),
});

export type MySchemaType = z.infer<typeof mySchema>;
```

---

## ♿ Accessibility Guidelines

### Keyboard Navigation
- **Tab** - Move focus forward
- **Shift + Tab** - Move focus backward
- **Enter/Space** - Activate buttons, links
- **Arrow keys** - Navigate menus, selects, accordions
- **Escape** - Close modals, dropdowns

### ARIA Labels
Always provide accessible names:
```tsx
// Good
<button aria-label="Close menu">
  <XIcon />
</button>

// Good
<button>
  <XIcon />
  <span>Close menu</span>
</button>
```

### Color Contrast
All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

Test with browser dev tools or online contrast checkers.

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables
Set these in your hosting platform:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_URL` - Production domain
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- Email service credentials (if using)

### Pre-Deployment Checklist
See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for comprehensive pre-deployment verification steps.

---

## 📊 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request:

1. **Lint** - ESLint code quality checks
2. **Type Check** - TypeScript compilation
3. **Build** - Production build verification
4. **Accessibility Audit** - Lighthouse CI tests
5. **Tests** - Unit/integration tests (when configured)

All checks must pass before merging to main branch.

---

## 🧪 Testing

### Unit Tests (To Be Configured)
```bash
# Install Jest and React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### E2E Tests (To Be Configured)
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npx playwright test
```

### Accessibility Testing
```bash
# Run Lighthouse CI
npm run lighthouse

# Or use browser extensions:
# - axe DevTools
# - WAVE
# - Lighthouse (Chrome DevTools)
```

---

## 📖 Documentation

### Storybook
View component documentation:
```bash
npm run storybook
```

Navigate to [http://localhost:6006](http://localhost:6006)

### Design System
- Color tokens: `design-system/tokens/colors.ts`
- Typography: `design-system/tokens/typography.ts`
- Motion: `design-system/motion/`
- Interactions: `design-system/interaction-contracts/`

### Project Status
See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed implementation status and metrics.

---

## 🤝 Contributing

### Code Style
- Use TypeScript for all new files
- Follow ESLint rules (automatically enforced)
- Format with Prettier before committing
- Write meaningful commit messages

### Pull Request Process
1. Create feature branch from `main`
2. Make changes and test locally
3. Run `npm run ci:all` to verify
4. Create PR with description
5. Wait for CI checks to pass
6. Request review from team
7. Merge after approval

### Component Guidelines
- Use design system tokens
- Include TypeScript types
- Add accessibility features (ARIA, keyboard nav)
- Write Storybook stories
- Test in multiple browsers

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment platform
- **Radix UI** - Accessible component primitives
- **Shadcn** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: [your-email@example.com]
- Documentation: [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

**Built with ❤️ using Next.js 16 and React 19**
