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
// Note: debounce module not found - commented out for now
// These exports will be available once the debounce module is created
// export {
//   debounce,
//   throttle,
//   useDebounce,
//   useDebouncedCallback,
//   useThrottledCallback,
//   rafThrottle,
//   useRafCallback,
//   idleCallback,
//   cancelIdleCallback,
// } from './debounce';
