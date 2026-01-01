/**
 * KERNEL LAYER - INVARIANTS
 * Core system invariants that must never be violated
 */

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Invariant violation: ${message}`);
  }
}

export function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`Expected ${name} to be defined`);
  }
}
