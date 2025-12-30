# Deployment Guide

## Overview

This guide covers production deployment strategies, environment configuration, CI/CD setup, and monitoring for the Canonstrata design system.

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All tests pass (`npm run ci:test`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Bundle size is within limits (`npm run monitor:bundle`)
- [ ] Lighthouse scores meet targets (`npm run lighthouse`)
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Monitoring configured
- [ ] Error tracking configured
- [ ] Analytics configured

## Environment Configuration

### Environment Variables

Create production `.env` file with these required variables:

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/database
DATABASE_POOL_SIZE=10

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secure-secret-key

# Email (Optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=noreply@your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# Error Tracking (Optional)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Monitoring (Optional)
NEXT_PUBLIC_MONITORING_ENDPOINT=/api/monitoring
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Deployment Platforms

### Vercel (Recommended)

Vercel provides the simplest deployment experience for Next.js applications.

#### Initial Setup

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Link Project**:
```bash
vercel link
```

4. **Configure Environment Variables**:
```bash
# Add via CLI
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production

# Or via Vercel Dashboard
# Settings → Environment Variables
```

5. **Deploy**:
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Automatic Deployments

Configure GitHub integration for automatic deployments:

1. Go to Vercel Dashboard
2. Import Git Repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. Enable automatic deployments:
   - Every push to `main` → Production
   - Every pull request → Preview

---

### Docker Deployment

For self-hosted or containerized deployments.

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/canonstrata
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=canonstrata
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Build and Run

```bash
# Build image
docker build -t canonstrata:latest .

# Run container
docker run -p 3000:3000 --env-file .env canonstrata:latest

# Or use Docker Compose
docker-compose up -d
```

---

### AWS Deployment

Deploy to AWS using various services.

#### AWS Amplify

1. **Connect Repository**:
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Select branch

2. **Configure Build**:
   
Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

3. **Environment Variables**:
   - Add via Amplify Console
   - Environment Variables section

4. **Deploy**:
   - Automatic on push

#### AWS ECS (Fargate)

1. **Push Docker image to ECR**:
```bash
aws ecr create-repository --repository-name canonstrata
docker tag canonstrata:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/canonstrata:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/canonstrata:latest
```

2. **Create ECS Task Definition**
3. **Create ECS Service**
4. **Configure Load Balancer**
5. **Set up Auto Scaling**

---

## Database Setup

### Prisma Migrations

#### Development to Production Flow

1. **Create Migration (Development)**:
```bash
npm run db:migrate:dev
```

2. **Commit Migration Files**:
```bash
git add prisma/migrations
git commit -m "chore: add database migration"
```

3. **Deploy Migration (Production)**:
```bash
npm run db:migrate
```

#### Production Migration Script

Create `scripts/migrate-production.sh`:

```bash
#!/bin/bash
set -e

echo "Running production database migrations..."

# Backup database first
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# Run migrations
npx prisma migrate deploy

echo "Migrations completed successfully!"
```

### Database Backups

#### Automated Backups

```bash
#!/bin/bash
# scripts/backup-database.sh

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/canonstrata-$TIMESTAMP.sql"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

# Upload to S3 (optional)
aws s3 cp $BACKUP_FILE.gz s3://your-backup-bucket/

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

#### Schedule with Cron

```cron
# Backup daily at 2 AM
0 2 * * * /path/to/scripts/backup-database.sh
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run typecheck
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
      
      - name: Check bundle size
        run: npm run monitor:bundle
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          
      - name: Run smoke tests
        run: |
          curl -f https://your-domain.com/api/health || exit 1
```

---

## Performance Optimization

### Build Optimization

#### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  
  // Output standalone for Docker
  output: 'standalone',
};

export default config;
```

### CDN Configuration

#### Cloudflare

1. **Setup**:
   - Add domain to Cloudflare
   - Configure DNS
   - Enable automatic HTTPS

2. **Page Rules**:
   - Cache everything on `/public/*`
   - Cache static assets
   - Browser cache TTL: 4 hours

3. **Performance**:
   - Enable Auto Minify (JS, CSS, HTML)
   - Enable Brotli compression
   - Enable HTTP/3

#### AWS CloudFront

1. **Create Distribution**
2. **Origin Settings**:
   - Origin Domain: your-app.vercel.app
   - Origin Protocol: HTTPS only

3. **Cache Behaviors**:
   - `/static/*` - Cache everything
   - `/_next/*` - Cache everything
   - Default - Cache with query strings

---

## Monitoring and Observability

### Application Monitoring

#### Vercel Analytics

Automatic with Vercel deployment:

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Custom Web Vitals

```typescript
// src/app/layout.tsx
export function reportWebVitals(metric: any) {
  // Send to analytics
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  });
}
```

### Error Tracking

#### Sentry Integration

1. **Install Sentry**:
```bash
npm install @sentry/nextjs
```

2. **Configure**:
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### Health Checks

Create health check endpoint:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
      },
      { status: 503 }
    );
  }
}
```

### Uptime Monitoring

Use services like:
- **UptimeRobot** - Free uptime monitoring
- **Pingdom** - Advanced monitoring
- **StatusCake** - Global monitoring

Configure checks for:
- `/` - Homepage
- `/api/health` - Health endpoint
- Critical user flows

---

## Security

### Security Headers

Configure in `next.config.ts`:

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
];

export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### SSL/TLS

Ensure HTTPS is enforced:
- Use platforms with automatic SSL (Vercel, Netlify)
- Or use Let's Encrypt for custom servers
- Configure HSTS headers

### Environment Security

- Never commit `.env` files
- Use secrets management (AWS Secrets Manager, Vault)
- Rotate secrets regularly
- Use different credentials per environment

---

## Rollback Strategy

### Quick Rollback

#### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

#### Git-based
```bash
# Revert commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql

# Or rollback migration
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Post-Deployment

### Smoke Tests

```bash
# Test homepage
curl -f https://your-domain.com || exit 1

# Test API
curl -f https://your-domain.com/api/health || exit 1

# Test authentication
curl -f https://your-domain.com/api/auth/session || exit 1
```

### Performance Verification

```bash
# Run Lighthouse
npm run lighthouse

# Check Web Vitals
# Monitor for 24 hours in analytics
```

### Monitoring

- Check error rates in Sentry
- Monitor response times
- Verify database connections
- Check CDN hit rates

---

## Troubleshooting

### Common Issues

**Build Fails**:
- Check Node.js version (>= 20)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check environment variables

**Database Connection**:
- Verify DATABASE_URL
- Check IP allowlist
- Verify SSL settings

**Environment Variables**:
- Verify all required vars are set
- Check for typos
- Restart application after changes

### Support

- Documentation: [docs.canonstrata.dev](https://docs.canonstrata.dev)
- Issues: GitHub Issues
- Email: support@canonstrata.dev

---

## Related Documentation

- [Architecture](./ARCHITECTURE.md)
- [Performance](./PERFORMANCE.md)
- [Testing](./TESTING.md)

---

**Last Updated**: 2025-12-30
