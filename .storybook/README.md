# Storybook Documentation

## Overview
Storybook is configured for the MAIN design system with full support for:
- ✅ React 19 & Next.js 16
- ✅ TypeScript with auto-generated docs
- ✅ Tailwind CSS v4 integration
- ✅ Accessibility (a11y) addon
- ✅ Dark/Light theme toggle
- ✅ Responsive viewport testing
- ✅ Framer Motion animations

## Structure
```
.storybook/
├── main.ts              # Storybook configuration
├── preview.ts           # Global decorators & parameters
└── preview-head.html    # Font imports

src/components/
├── ui/*.stories.tsx     # UI component stories
├── motion/*.stories.tsx # Animation component stories
└── layout/*.stories.tsx # Layout component stories
```

## Running Storybook

### Development
```bash
npm run storybook
```
Opens at http://localhost:6006

### Build
```bash
npm run build-storybook
```
Outputs to `storybook-static/`

## Features

### Theme Toggle
Global toolbar includes light/dark theme switcher that applies to all components.

### Accessibility Testing
Every story includes automatic a11y audits:
- Color contrast
- ARIA attributes
- Button names
- Keyboard navigation

### Responsive Testing
Predefined viewports:
- Mobile: 375x667
- Tablet: 768x1024
- Desktop: 1440x900

### Auto Documentation
TypeScript props are automatically documented using `react-docgen-typescript`.

## Component Coverage

### UI Components (13)
- ✅ Button
- ✅ Dialog
- ✅ Input
- ✅ Dropdown Menu
- ✅ Select
- ✅ Tooltip
- ✅ Accordion
- ✅ Textarea
- ✅ Label
- ✅ Form
- ✅ Form Field
- ✅ Form Error
- ✅ Form Success

### Motion Components (5)
- ✅ FadeIn
- ✅ SlideIn
- ✅ Scale
- ✅ StaggerContainer
- ✅ MotionWrapper

### Layout Components (4)
- ✅ Container
- ✅ Section
- ✅ Grid
- ✅ Flex

## Adding Stories

### Template
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './your-component';

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Props
  },
};
```

## CI Integration
Storybook builds are included in `.github/workflows/ci.yml`:
```yaml
- name: Build Storybook
  run: npm run build-storybook
```

## Phase 5 Status: ✅ COMPLETE
- ✅ Storybook configuration
- ✅ Theme integration
- ✅ A11y addon
- ✅ Component stories (22 total)
- ✅ Documentation
- ✅ CI/CD integration
