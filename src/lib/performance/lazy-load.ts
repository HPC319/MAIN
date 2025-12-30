import { lazy, Suspense, ComponentType, ReactNode } from 'react';

/**
 * Lazy load component with custom fallback
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
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
export function lazyLoadWithRetry<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 3,
  fallback?: ReactNode
) {
  const retry = async (fn: () => Promise<any>, retriesLeft: number): Promise<any> => {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft <= 0) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retry(fn, retriesLeft - 1);
    }
  };

  const LazyComponent = lazy(() => retry(importFunc, retries));

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

/**
 * Create a lazy loading wrapper with custom loading state
 */
export function createLazyWrapper(fallback?: ReactNode) {
  return <T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ) => {
    const LazyComponent = lazy(importFunc);
    return (props: React.ComponentProps<T>) => (
      <Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
