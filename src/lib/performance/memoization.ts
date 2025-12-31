import { memo, useMemo, useCallback, DependencyList } from 'react';

/**
 * Enhanced memo with custom comparison
 */
export function memoWithComparison<P extends object>(
  Component: React.FC<P>,
  compare?: (prevProps: P, nextProps: P) => boolean
) {
  return memo(Component, compare);
}

/**
 * Shallow comparison for memo
 */
export function shallowEqual<T extends Record<string, unknown>>(
  objA: T,
  objB: T
): boolean {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!Object.is(objA[key], objB[key])) return false;
  }

  return true;
}

/**
 * Deep comparison for memo
 */
export function deepEqual(objA: unknown, objB: unknown): boolean {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (!deepEqual((objA as Record<string, unknown>)[key], (objB as Record<string, unknown>)[key])) return false;
  }

  return true;
}

/**
 * Memoization utilities
 */
export const memoize = {
  /**
   * Create a memoized value with useMemo
   */
  value: <T,>(factory: () => T, deps: DependencyList): T => {
    return useMemo(factory, deps);
  },

  /**
   * Create a memoized callback with useCallback
   */
  callback: <T extends (...args: unknown[]) => unknown>(
    callback: T,
    deps: DependencyList
  ): T => {
    return useCallback(callback, deps) as T;
  },

  /**
   * Memoize expensive computations
   */
  compute: <T,>(fn: () => T, deps: DependencyList): T => {
    return useMemo(() => {
      const startTime = performance.now();
      const result = fn();
      const endTime = performance.now();
      
      if (process.env.NODE_ENV === 'development') {
        console.debug(`Memoized computation took ${endTime - startTime}ms`);
      }
      
      return result;
    }, deps);
  },
};

/**
 * Create a stable reference
 */
export function useStableReference<T>(value: T): T {
  return useMemo(() => value, [JSON.stringify(value)]);
}

/**
 * Create a function that only runs once
 */
export function useOnce<T extends (...args: unknown[]) => unknown>(callback: T): T {
  const hasRun = useMemo(() => ({ current: false }), []);
  
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (!hasRun.current) {
      hasRun.current = true;
      return callback(...args) as ReturnType<T>;
    }
    return undefined as ReturnType<T>;
  }, [callback, hasRun]) as T;
}
