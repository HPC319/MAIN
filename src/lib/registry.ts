import type { ITradeAdapter } from '@/types/core';

class AdapterRegistry<T extends ITradeAdapter = ITradeAdapter> {
  private readonly store = new Map<string, T>();

  register(adapter: T): void {
    this.store.set(adapter.name, adapter);
  }

  resolve(name: string): T {
    const adapter = this.store.get(name);
    if (!adapter) {
      throw new Error(`Adapter "${name}" not registered`);
    }
    return adapter;
  }

  has(name: string): boolean {
    return this.store.has(name);
  }

  list(): readonly string[] {
    return Array.from(this.store.keys());
  }
}

export const tradeRegistry = new AdapterRegistry<ITradeAdapter>();

export function useAdapter(name: string = 'generic'): ITradeAdapter {
  return tradeRegistry.resolve(name);
}
