import { lazy, Suspense, ComponentType, ReactNode, createElement } from 'react';

/**
 * Lazy load component with custom fallback
 */
export function lazyLoad<T extends ComponentType<Record<string, unknown>>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) =>
    createElement(Suspense, { fallback: fallback || createElement('div', null, 'Loading...') },
      createElement(LazyComponent, props as unknown as React.ComponentPropsWithoutRef<T> & Record<string, unknown>)
    );
}

/**
 * Preload a lazy component
 */
export function preloadComponent<T>(
  importFunc: () => Promise<{ default: T }>
): void {
  importFunc();
}

/**
 * Lazy load with retry logic
 */
export function lazyLoadWithRetry<T extends ComponentType<Record<string, unknown>>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 3,
  fallback?: ReactNode
) {
  const retry = async (fn: () => Promise<{ default: T }>, retriesLeft: number): Promise<{ default: T }> => {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft <= 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retry(fn, retriesLeft - 1);
    }
  };

  const LazyComponent = lazy(() => retry(importFunc, retries));

  return (props: React.ComponentProps<T>) =>
    createElement(Suspense, { fallback: fallback || createElement('div', null, 'Loading...') },
      createElement(LazyComponent, props as unknown as React.ComponentPropsWithoutRef<T> & Record<string, unknown>)
    );
}

/**
 * Create a lazy loading wrapper with custom loading state
 */
export function createLazyWrapper(fallback?: ReactNode) {
  return <T extends ComponentType<Record<string, unknown>>>(
    importFunc: () => Promise<{ default: T }>
  ) => {
    const LazyComponent = lazy(importFunc);
    return (props: React.ComponentProps<T>) =>
      createElement(Suspense, { fallback: fallback || createElement('div', null, 'Loading...') },
        createElement(LazyComponent, props as unknown as React.ComponentPropsWithoutRef<T>)
      );
  };
}
