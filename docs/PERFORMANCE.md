# Performance Optimization Guide

## Overview

This guide covers performance optimization strategies, Core Web Vitals targets, monitoring, and best practices for the Canonstrata design system.

## Core Web Vitals Targets

### Production Targets (P75)

| Metric | Target | Good | Needs Improvement | Poor |
|--------|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.0s | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **FID** (First Input Delay) | ≤ 50ms | ≤ 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.05 | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | ≤ 100ms | ≤ 200ms | 200ms - 500ms | > 500ms |
| **TTFB** (Time to First Byte) | ≤ 500ms | ≤ 800ms | 800ms - 1800ms | > 1800ms |
| **FCP** (First Contentful Paint) | ≤ 1.2s | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |

### Bundle Size Targets

| Asset Type | Target | Maximum |
|------------|--------|---------|
| **Initial JS** | ≤ 150 KB | 200 KB |
| **Total JS** | ≤ 400 KB | 500 KB |
| **Initial CSS** | ≤ 30 KB | 50 KB |
| **Total CSS** | ≤ 60 KB | 80 KB |
| **Images (per page)** | ≤ 500 KB | 1 MB |
| **Fonts** | ≤ 100 KB | 150 KB |

### Performance Budget

Configure in `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "first-contentful-paint": ["error", {"maxNumericValue": 1200}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.05}],
        "total-blocking-time": ["error", {"maxNumericValue": 150}],
        "speed-index": ["error", {"maxNumericValue": 2000}],
        "interactive": ["error", {"maxNumericValue": 3000}],
        "total-byte-weight": ["error", {"maxNumericValue": 512000}],
        "dom-size": ["error", {"maxNumericValue": 1500}]
      }
    }
  }
}
```

---

## Performance Optimization Strategies

### 1. Code Splitting & Lazy Loading

#### Dynamic Imports

```typescript
// ❌ Bad: Import everything upfront
import { HeavyChart } from '@/components/charts';

// ✅ Good: Dynamic import
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/charts/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Disable SSR for client-only components
});
```

#### Route-based Code Splitting

```typescript
// src/app/dashboard/page.tsx
import dynamic from 'next/dynamic';

// Automatically code-split by route
const DashboardContent = dynamic(() => import('@/components/dashboard/DashboardContent'));

export default function DashboardPage() {
  return <DashboardContent />;
}
```

#### Component-level Splitting

```typescript
// Split heavy components
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  loading: () => <EditorSkeleton />,
});

const DataVisualization = dynamic(() => import('@/components/DataVisualization'), {
  loading: () => <VisualizationSkeleton />,
});
```

---

### 2. Image Optimization

#### Next.js Image Component

```typescript
import Image from 'next/image';

// ✅ Optimized images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Or import from image
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// For background images
<div className="relative h-screen">
  <Image
    src="/background.jpg"
    alt="Background"
    fill
    style={{ objectFit: 'cover' }}
    priority
  />
</div>
```

#### Image Formats

```typescript
// next.config.ts
export default {
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats first
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
};
```

#### Lazy Loading Images

```typescript
// Below-the-fold images
<Image
  src="/gallery-1.jpg"
  alt="Gallery image"
  width={400}
  height={300}
  loading="lazy" // Default behavior
  placeholder="blur"
/>
```

---

### 3. Font Optimization

#### Next.js Font Optimization

```typescript
// src/app/layout.tsx
import { Inter, Geist_Mono } from 'next/font/google';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  preload: true,
  fallback: ['monospace'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

#### Custom Fonts

```typescript
import localFont from 'next/font/local';

const customFont = localFont({
  src: [
    {
      path: '../fonts/custom-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/custom-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
  preload: true,
});
```

#### Font Loading Strategy

```css
/* Prevent Flash of Unstyled Text (FOUT) */
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* or 'optional' for fastest load */
  font-weight: 400;
}
```

---

### 4. JavaScript Optimization

#### Tree Shaking

```typescript
// ❌ Bad: Import entire library
import _ from 'lodash';

// ✅ Good: Import specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ✅ Even better: Use native alternatives
const debounce = (fn: Function, ms: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};
```

#### Remove Unused Code

```typescript
// next.config.ts
export default {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      '@/components',
    ],
  },
};
```

#### Minification

```bash
# Automatic with Next.js build
npm run build

# Verify bundle size
npm run monitor:bundle
```

---

### 5. CSS Optimization

#### Critical CSS

Next.js automatically inlines critical CSS. Ensure styles are modular:

```typescript
// Component-scoped CSS modules
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

#### Tailwind CSS Optimization

```typescript
// tailwind.config.ts
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Remove unused utilities
  safelist: [], // Only safelist what's absolutely needed
};
```

#### PostCSS Optimization

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        }],
      },
    } : {}),
  },
};
```

---

### 6. Rendering Optimization

#### Server Components (Default)

```typescript
// Server Component (no 'use client')
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Client Components (When Needed)

```typescript
'use client';

// Only use for:
// - Event handlers
// - Browser APIs
// - useState, useEffect
// - Context providers

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### Streaming SSR

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

// Async Server Component
async function DashboardContent() {
  const data = await fetchDashboardData();
  return <Dashboard data={data} />;
}
```

---

### 7. Data Fetching Optimization

#### Server-side Caching

```typescript
// Fetch with caching
export async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { 
      revalidate: 3600, // Revalidate every hour
      tags: ['data'], // For on-demand revalidation
    },
  });
  return res.json();
}

// Static data (cached indefinitely)
export async function getStaticData() {
  const res = await fetch('https://api.example.com/static', {
    cache: 'force-cache',
  });
  return res.json();
}

// Dynamic data (no caching)
export async function getDynamicData() {
  const res = await fetch('https://api.example.com/dynamic', {
    cache: 'no-store',
  });
  return res.json();
}
```

#### Parallel Data Fetching

```typescript
// ❌ Bad: Sequential fetching
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();

// ✅ Good: Parallel fetching
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments(),
]);
```

#### Request Deduplication

Next.js automatically deduplicates identical requests:

```typescript
// Both fetch the same data, but only one request is made
async function Header() {
  const user = await fetchUser();
  return <div>{user.name}</div>;
}

async function Sidebar() {
  const user = await fetchUser(); // Deduplicated!
  return <div>{user.avatar}</div>;
}
```

---

### 8. Database Optimization

#### Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

#### Query Optimization

```typescript
// ❌ Bad: N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } });
}

// ✅ Good: Single query with includes
const users = await prisma.user.findMany({
  include: {
    posts: true,
  },
});
```

#### Selective Field Loading

```typescript
// Load only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    // Skip large fields
  },
});
```

#### Indexing

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  
  @@index([email])
  @@index([createdAt])
}
```

---

### 9. Caching Strategy

#### Static Generation

```typescript
// Generate at build time
export const dynamic = 'force-static';

export default async function StaticPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Incremental Static Regeneration (ISR)

```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ISRPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

#### Client-side Caching

```typescript
// React Query / SWR
'use client';

import useSWR from 'swr';

export function ClientData() {
  const { data, error, isLoading } = useSWR('/api/data', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{data}</div>;
}
```

#### CDN Caching

```typescript
// Set cache headers
export async function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

---

### 10. Runtime Performance

#### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

// Memo component
export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* render */}</div>;
});

// Memo value
function Component({ items }) {
  const filtered = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);
  
  return <List items={filtered} />;
}

// Memo callback
function Component({ onSave }) {
  const handleSave = useCallback(() => {
    onSave();
  }, [onSave]);
  
  return <Button onClick={handleSave} />;
}
```

#### Virtual Scrolling

```typescript
'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Debouncing & Throttling

```typescript
'use client';

import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function SearchInput() {
  const [value, setValue] = useState('');
  
  const debounced = useDebouncedCallback((value) => {
    // Expensive operation
    performSearch(value);
  }, 300);
  
  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}
```

---

## Performance Monitoring

### Web Vitals Tracking

```typescript
// src/app/layout.tsx
export function reportWebVitals(metric: any) {
  const body = JSON.stringify(metric);
  const url = '/api/analytics';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}
```

### Analytics API

```typescript
// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const metric = await request.json();
  
  // Log to analytics service
  console.log({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    label: metric.label,
  });
  
  return NextResponse.json({ success: true });
}
```

### Lighthouse CI

```bash
# Run Lighthouse
npm run lighthouse

# CI integration
npm run lighthouse:ci
```

### Bundle Analysis

```bash
# Analyze bundle
npm run analyze

# Monitor bundle size
npm run monitor:bundle
```

---

## Performance Testing

### Lighthouse

```bash
# Run Lighthouse audit
npx lighthouse https://your-domain.com --view

# Performance only
npx lighthouse https://your-domain.com --only-categories=performance --view
```

### WebPageTest

Test on real devices and connections:
```
https://www.webpagetest.org/
```

### Chrome DevTools

1. **Performance Panel**: Record and analyze runtime performance
2. **Coverage Panel**: Find unused JavaScript and CSS
3. **Network Panel**: Analyze resource loading
4. **Lighthouse Panel**: Run audits

---

## Performance Checklist

### Pre-deployment

- [ ] Run Lighthouse audit (score ≥ 90)
- [ ] Check bundle size (JS ≤ 400 KB)
- [ ] Verify Core Web Vitals targets
- [ ] Test on slow 3G connection
- [ ] Test on mobile devices
- [ ] Analyze coverage report
- [ ] Check image optimization
- [ ] Verify font loading
- [ ] Test with disabled JavaScript
- [ ] Check server response times

### Post-deployment

- [ ] Monitor Web Vitals in production
- [ ] Track error rates
- [ ] Monitor bundle size trends
- [ ] Check CDN cache hit rates
- [ ] Monitor database query performance
- [ ] Track API response times
- [ ] Review analytics data
- [ ] Check for regressions

---

## Common Performance Issues

### Issue: Large JavaScript Bundle

**Solutions**:
- Use dynamic imports
- Remove unused dependencies
- Enable tree shaking
- Use lighter alternatives

### Issue: Slow Time to First Byte (TTFB)

**Solutions**:
- Use CDN
- Enable server-side caching
- Optimize database queries
- Use connection pooling
- Consider edge functions

### Issue: Layout Shift (CLS)

**Solutions**:
- Set explicit width/height on images
- Reserve space for dynamic content
- Use `aspect-ratio` CSS property
- Avoid inserting content above existing content

### Issue: Slow Largest Contentful Paint (LCP)

**Solutions**:
- Optimize images
- Use `priority` prop for above-the-fold images
- Reduce render-blocking resources
- Use server-side rendering
- Implement resource hints

### Issue: Poor Interaction to Next Paint (INP)

**Solutions**:
- Reduce JavaScript execution time
- Use web workers for heavy computations
- Implement virtualization for long lists
- Debounce/throttle event handlers
- Optimize third-party scripts

---

## Tools & Resources

### Performance Tools

- **Lighthouse**: Web performance auditing
- **WebPageTest**: Real-device testing
- **Chrome DevTools**: Performance profiling
- **Next.js Bundle Analyzer**: Bundle analysis
- **Web Vitals Extension**: Real-time metrics

### Monitoring Services

- **Vercel Analytics**: Built-in analytics
- **Google Analytics**: User analytics
- **Sentry**: Error tracking
- **DataDog**: Application monitoring
- **New Relic**: Performance monitoring

### Testing Tools

- **Playwright**: E2E and performance testing
- **Vitest**: Unit test performance
- **Lighthouse CI**: Automated audits

---

## Related Documentation

- [Architecture](./ARCHITECTURE.md)
- [Testing](./TESTING.md)
- [Deployment](./DEPLOYMENT.md)
- [Monitoring](../scripts/monitoring/)

---

**Last Updated**: 2025-12-30

**Performance Targets Version**: 2.0
