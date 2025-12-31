// @ts-nocheck
/**
 * CANONSTRATA ADAPTIVE RENDERING MODES
 * 
 * Intelligent rendering system that adapts to device capabilities,
 * network conditions, and user preferences.
 */

'use client';

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

// ============================================================================
// RENDERING MODE TYPES
// ============================================================================

export type RenderingMode = 
  | 'high-performance'  // Desktop, high-end devices, fast network
  | 'balanced'           // Standard devices, average network
  | 'low-power'          // Mobile, battery saver, slow network
  | 'minimal';           // Reduced motion, data saver, accessibility

export interface RenderingConfig {
  mode: RenderingMode;
  features: {
    animations: boolean;
    shadows: boolean;
    gradients: boolean;
    blur: boolean;
    images: 'full' | 'compressed' | 'placeholder';
    fonts: 'all' | 'system';
    lazyLoad: boolean;
    prefetch: boolean;
  };
  performance: {
    maxFPS: number;
    debounceMs: number;
    throttleMs: number;
  };
}

// ============================================================================
// DEVICE DETECTION
// ============================================================================

function detectDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return {
      cores: 2,
      memory: 4,
      connection: 'unknown' as const,
      batteryLevel: 1,
      devicePixelRatio: 1,
    };
  }

  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  
  return {
    cores: nav.hardwareConcurrency || 2,
    memory: nav.deviceMemory || 4,
    connection: (nav.connection?.effectiveType || 'unknown') as '4g' | '3g' | '2g' | 'slow-2g' | 'unknown',
    batteryLevel: 1, // Will be updated by battery API
    devicePixelRatio: window.devicePixelRatio || 1,
  };
}

function detectUserPreferences() {
  if (typeof window === 'undefined') {
    return {
      reducedMotion: false,
      reducedData: false,
      colorScheme: 'light' as const,
    };
  }

  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    reducedData: (navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void } }).connection?.saveData || false,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' as const : 'light' as const,
  };
}

// ============================================================================
// RENDERING MODE DETECTION
// ============================================================================

function detectRenderingMode(): RenderingMode {
  const capabilities = detectDeviceCapabilities();
  const preferences = detectUserPreferences();

  // User prefers reduced motion or data saver
  if (preferences.reducedMotion || preferences.reducedData) {
    return 'minimal';
  }

  // Low-end device detection
  const isLowEnd = 
    capabilities.cores <= 2 ||
    capabilities.memory <= 2 ||
    capabilities.connection === '2g' ||
    capabilities.connection === 'slow-2g';

  if (isLowEnd) {
    return 'low-power';
  }

  // High-end device detection
  const isHighEnd =
    capabilities.cores >= 8 &&
    capabilities.memory >= 8 &&
    capabilities.connection === '4g';

  if (isHighEnd) {
    return 'high-performance';
  }

  // Default to balanced
  return 'balanced';
}

// ============================================================================
// DEVICE INTERFACE EXTENSION
// ============================================================================

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<{
    level: number;
    charging: boolean;
    addEventListener: (event: string, handler: () => void) => void;
  }>;
}

// ============================================================================
// RENDERING CONFIGURATIONS
// ============================================================================

const RENDERING_CONFIGS: Record<RenderingMode, RenderingConfig> = {
  'high-performance': {
    mode: 'high-performance',
    features: {
      animations: true,
      shadows: true,
      gradients: true,
      blur: true,
      images: 'full',
      fonts: 'all',
      lazyLoad: false,
      prefetch: true,
    },
    performance: {
      maxFPS: 60,
      debounceMs: 100,
      throttleMs: 16,
    },
  },
  
  'balanced': {
    mode: 'balanced',
    features: {
      animations: true,
      shadows: true,
      gradients: true,
      blur: false,
      images: 'compressed',
      fonts: 'all',
      lazyLoad: true,
      prefetch: false,
    },
    performance: {
      maxFPS: 60,
      debounceMs: 150,
      throttleMs: 32,
    },
  },
  
  'low-power': {
    mode: 'low-power',
    features: {
      animations: false,
      shadows: false,
      gradients: false,
      blur: false,
      images: 'compressed',
      fonts: 'system',
      lazyLoad: true,
      prefetch: false,
    },
    performance: {
      maxFPS: 30,
      debounceMs: 300,
      throttleMs: 64,
    },
  },
  
  'minimal': {
    mode: 'minimal',
    features: {
      animations: false,
      shadows: false,
      gradients: false,
      blur: false,
      images: 'placeholder',
      fonts: 'system',
      lazyLoad: true,
      prefetch: false,
    },
    performance: {
      maxFPS: 30,
      debounceMs: 500,
      throttleMs: 100,
    },
  },
};

// ============================================================================
// RENDERING CONTEXT
// ============================================================================

interface RenderingContextValue {
  mode: RenderingMode;
  config: RenderingConfig;
  setMode: (mode: RenderingMode) => void;
  shouldRender: (feature: keyof RenderingConfig['features']) => boolean;
}

const RenderingContext = createContext<RenderingContextValue | null>(null);

export function useRendering(): RenderingContextValue {
  const context = useContext(RenderingContext);
  if (!context) {
    throw new Error('useRendering must be used within RenderingProvider');
  }
  return context;
}

// ============================================================================
// RENDERING PROVIDER
// ============================================================================

interface RenderingProviderProps {
  children: ReactNode;
  defaultMode?: RenderingMode;
}

export function RenderingProvider({ children, defaultMode }: RenderingProviderProps) {
  const [mode, setMode] = useState<RenderingMode>(() => {
    if (defaultMode) return defaultMode;
    return detectRenderingMode();
  });

  const [config, setConfig] = useState<RenderingConfig>(() => RENDERING_CONFIGS[mode]);

  // Update config when mode changes
  useEffect(() => {
    setConfig(RENDERING_CONFIGS[mode]);
  }, [mode]);

  // Monitor battery level
  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (typeof navigator === 'undefined' || !nav.getBattery) {
      return;
    }

    nav.getBattery().then((battery) => {
      const updateBatteryMode = () => {
        if (battery.level < 0.2 && !battery.charging && mode !== 'minimal') {
          setMode('low-power');
        }
      };

      battery.addEventListener('levelchange', updateBatteryMode);
      battery.addEventListener('chargingchange', updateBatteryMode);
      updateBatteryMode();
    });
  }, [mode]);

  // Monitor network changes
  useEffect(() => {
    if (typeof navigator === 'undefined' || !(navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void } }).connection) {
      return;
    }

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void } }).connection;
    
    const handleConnectionChange = () => {
      const newMode = detectRenderingMode();
      if (newMode !== mode) {
        setMode(newMode);
      }
    };

    connection.addEventListener('change', handleConnectionChange);
    return () => connection.removeEventListener('change', handleConnectionChange);
  }, [mode]);

  const shouldRender = useCallback(
    (feature: keyof RenderingConfig['features']): boolean => {
      return !!config.features[feature];
    },
    [config]
  );

  const value: RenderingContextValue = {
    mode,
    config,
    setMode,
    shouldRender,
  };

  return (
    <RenderingContext.Provider value={value}>
      {children}
    </RenderingContext.Provider>
  );
}

// ============================================================================
// CONDITIONAL RENDERING HOOKS
// ============================================================================

/**
 * Hook to conditionally render based on rendering mode
 */
export function useConditionalRender<T>(
  highPerf: T,
  balanced: T,
  lowPower: T,
  minimal: T
): T {
  const { mode } = useRendering();
  
  switch (mode) {
    case 'high-performance':
      return highPerf;
    case 'balanced':
      return balanced;
    case 'low-power':
      return lowPower;
    case 'minimal':
      return minimal;
  }
}

/**
 * Hook to check if animations should render
 */
export function useAnimations(): boolean {
  const { shouldRender } = useRendering();
  return shouldRender('animations');
}

/**
 * Hook to check if shadows should render
 */
export function useShadows(): boolean {
  const { shouldRender } = useRendering();
  return shouldRender('shadows');
}

/**
 * Hook to get image quality
 */
export function useImageQuality(): 'full' | 'compressed' | 'placeholder' {
  const { config } = useRendering();
  return config.features.images;
}

/**
 * Hook to get performance config
 */
export function usePerformanceConfig() {
  const { config } = useRendering();
  return config.performance;
}

// ============================================================================
// ADAPTIVE COMPONENTS
// ============================================================================

/**
 * Conditional render component based on rendering mode
 */
interface AdaptiveProps {
  children: ReactNode;
  feature: keyof RenderingConfig['features'];
  fallback?: ReactNode;
}

export function Adaptive({ children, feature, fallback = null }: AdaptiveProps) {
  const { shouldRender } = useRendering();
  return shouldRender(feature) ? <>{children}</> : <>{fallback}</>;
}

/**
 * Animation wrapper that respects rendering mode
 */
interface AdaptiveAnimationProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdaptiveAnimation({ children, fallback }: AdaptiveAnimationProps) {
  const animations = useAnimations();
  return animations ? <>{children}</> : <>{fallback || children}</>;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { RenderingMode, RenderingConfig, RenderingContextValue };
export {
  RenderingProvider,
  useRendering,
  useConditionalRender,
  useAnimations,
  useShadows,
  useImageQuality,
  usePerformanceConfig,
  Adaptive,
  AdaptiveAnimation,
  detectDeviceCapabilities,
  detectUserPreferences,
  detectRenderingMode,
  RENDERING_CONFIGS,
};
