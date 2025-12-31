// @ts-nocheck
/**
 * Performance Optimization Utilities
 * 
 * @module performance
 * @description Collection of utilities for optimizing React application performance
 */

// Lazy loading utilities
export {
  lazyLoad,
  preloadComponent,
  lazyLoadWithRetry,
  createLazyWrapper,
} from './lazy-load';

// Memoization utilities
export {
  memoWithComparison,
  shallowEqual,
  deepEqual,
  memoize,
  useStableReference,
  useOnce,
} from './memoization';

// Debounce and throttle utilities
export {
  debounce,
  throttle,
  useDebounce,
  useDebouncedCallback,
  useThrottledCallback,
  rafThrottle,
  useRafCallback,
  idleCallback,
  cancelIdleCallback,
} from './debounce';
