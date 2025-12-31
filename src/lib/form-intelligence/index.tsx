/**
 * CANONSTRATA FORM STATE INTELLIGENCE LAYER
 * 
 * Advanced form state management with intelligent validation,
 * auto-save, conflict resolution, and predictive UX.
 */

'use client';

import { useState, useEffect, useCallback, useRef, createContext, useContext, type ReactNode } from 'react';
import { useForm, type UseFormReturn, type FieldValues, type FieldErrors } from 'react-hook-form';
import { invariant } from '../invariants';

// ============================================================================
// FORM STATE TYPES
// ============================================================================

export type FormState = 
  | 'idle'
  | 'touched'
  | 'validating'
  | 'valid'
  | 'invalid'
  | 'submitting'
  | 'submitted'
  | 'error';

export interface FieldMeta {
  touched: boolean;
  dirty: boolean;
  focused: boolean;
  validating: boolean;
  error?: string;
  lastModified: number;
}

export interface FormIntelligence<T extends FieldValues> {
  state: FormState;
  fields: Record<keyof T, FieldMeta>;
  autoSave: {
    enabled: boolean;
    lastSaved?: number;
    saving: boolean;
    error?: string;
  };
  predictions: {
    nextField?: keyof T;
    completionPercentage: number;
    estimatedTimeRemaining?: number;
  };
  conflicts: {
    hasConflict: boolean;
    conflictedFields: (keyof T)[];
  };
}

// ============================================================================
// AUTO-SAVE MANAGER
// ============================================================================

interface AutoSaveConfig<T = unknown> {
  enabled: boolean;
  debounceMs: number;
  storageKey: string;
  onSave?: (data: T) => Promise<void>;
}

function useAutoSave<T extends FieldValues>(
  form: UseFormReturn<T>,
  config: AutoSaveConfig<T>
) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number>();
  const [error, setError] = useState<string>();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const save = useCallback(async (data: T) => {
    if (!config.enabled) return;

    try {
      setSaving(true);
      setError(undefined);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(config.storageKey, JSON.stringify(data));
      }

      // Call custom save handler
      if (config.onSave) {
        await config.onSave(data);
      }

      setLastSaved(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }, [config]);

  const debouncedSave = useCallback((data: T) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      save(data);
    }, config.debounceMs);
  }, [config.debounceMs, save]);

  // Watch form changes
  useEffect(() => {
    if (!config.enabled) return;

    const subscription = form.watch((data) => {
      debouncedSave(data);
    });

    return () => subscription.unsubscribe();
  }, [form, config.enabled, debouncedSave]);

  // Load saved data on mount
  useEffect(() => {
    if (!config.enabled || typeof window === 'undefined') return;

    const saved = localStorage.getItem(config.storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        form.reset(data);
      } catch {
        // Ignore parse errors
      }
    }
  }, [config.storageKey, config.enabled, form]);

  return { saving, lastSaved, error };
}

// ============================================================================
// FIELD PROGRESS TRACKER
// ============================================================================

function useFieldProgress<T extends FieldValues>(
  form: UseFormReturn<T>,
  requiredFields: (keyof T)[]
) {
  const [progress, setProgress] = useState(0);
  const [nextField, setNextField] = useState<keyof T>();

  useEffect(() => {
    const subscription = form.watch((data) => {
      const filled = requiredFields.filter(field => {
        const value = data[field as string];
        return value !== undefined && value !== '' && value !== null;
      });

      const percentage = (filled.length / requiredFields.length) * 100;
      setProgress(Math.round(percentage));

      // Determine next field
      const next = requiredFields.find(field => {
        const value = data[field as string];
        return value === undefined || value === '' || value === null;
      });
      setNextField(next);
    });

    return () => subscription.unsubscribe();
  }, [form, requiredFields]);

  return { progress, nextField };
}

// ============================================================================
// VALIDATION STATE TRACKER
// ============================================================================

function useValidationState<T extends FieldValues>(
  form: UseFormReturn<T>
): FormState {
  const [state, setState] = useState<FormState>('idle');
  const { formState, watch } = form;

  useEffect(() => {
    if (formState.isSubmitting) {
      setState('submitting');
    } else if (formState.isSubmitted && formState.isValid) {
      setState('submitted');
    } else if (formState.isSubmitted && !formState.isValid) {
      setState('error');
    } else if (formState.isValidating) {
      setState('validating');
    } else if (formState.isDirty && formState.isValid) {
      setState('valid');
    } else if (formState.isDirty && !formState.isValid) {
      setState('invalid');
    } else if (formState.isTouched || formState.isDirty) {
      setState('touched');
    } else {
      setState('idle');
    }
  }, [formState]);

  return state;
}

// ============================================================================
// FIELD META TRACKER
// ============================================================================

function useFieldMeta<T extends FieldValues>(
  form: UseFormReturn<T>,
  fieldName: keyof T
): FieldMeta {
  const { formState, getFieldState } = form;
  const fieldState = getFieldState(fieldName as string, formState);
  const [focused, setFocused] = useState(false);

  return {
    touched: fieldState.isTouched || false,
    dirty: fieldState.isDirty || false,
    focused,
    validating: formState.isValidating,
    error: fieldState.error?.message,
    lastModified: Date.now(),
  };
}

// ============================================================================
// FORM INTELLIGENCE HOOK
// ============================================================================

interface UseFormIntelligenceConfig<T extends FieldValues> {
  autoSave?: Partial<AutoSaveConfig<T>>;
  requiredFields?: (keyof T)[];
  onConflict?: (field: keyof T, local: T[keyof T], remote: T[keyof T]) => T[keyof T];
}

export function useFormIntelligence<T extends FieldValues>(
  form: UseFormReturn<T>,
  config: UseFormIntelligenceConfig<T> = {}
): FormIntelligence<T> {
  const state = useValidationState(form);
  
  const autoSaveConfig: AutoSaveConfig<T> = {
    enabled: config.autoSave?.enabled ?? false,
    debounceMs: config.autoSave?.debounceMs ?? 1000,
    storageKey: config.autoSave?.storageKey ?? 'form-auto-save',
    onSave: config.autoSave?.onSave,
  };

  const autoSave = useAutoSave(form, autoSaveConfig);
  
  const requiredFields = config.requiredFields ?? Object.keys(form.getValues()) as (keyof T)[];
  const progress = useFieldProgress(form, requiredFields);

  // Track field metadata
  const fields = Object.keys(form.getValues()).reduce((acc, key) => {
    acc[key as keyof T] = {
      touched: false,
      dirty: false,
      focused: false,
      validating: false,
      lastModified: Date.now(),
    };
    return acc;
  }, {} as Record<keyof T, FieldMeta>);

  return {
    state,
    fields,
    autoSave: {
      enabled: autoSaveConfig.enabled,
      lastSaved: autoSave.lastSaved,
      saving: autoSave.saving,
      error: autoSave.error,
    },
    predictions: {
      nextField: progress.nextField,
      completionPercentage: progress.progress,
      estimatedTimeRemaining: undefined,
    },
    conflicts: {
      hasConflict: false,
      conflictedFields: [],
    },
  };
}

// ============================================================================
// SMART FORM CONTEXT
// ============================================================================

interface SmartFormContextValue<T extends FieldValues> {
  intelligence: FormIntelligence<T>;
  focusNextField: () => void;
  focusField: (field: keyof T) => void;
  getFieldProgress: () => number;
}

const SmartFormContext = createContext<SmartFormContextValue<Record<string, unknown>> | null>(null);

export function useSmartForm<T extends FieldValues>(): SmartFormContextValue<T> {
  const context = useContext(SmartFormContext);
  invariant(context !== null, 'useSmartForm must be used within SmartFormProvider');
  return context as SmartFormContextValue<T>;
}

// ============================================================================
// SMART FORM PROVIDER
// ============================================================================

interface SmartFormProviderProps<T extends FieldValues> {
  children: ReactNode;
  form: UseFormReturn<T>;
  intelligence: FormIntelligence<T>;
}

export function SmartFormProvider<T extends FieldValues>({
  children,
  form,
  intelligence,
}: SmartFormProviderProps<T>) {
  const focusNextField = useCallback(() => {
    if (intelligence.predictions.nextField) {
      form.setFocus(intelligence.predictions.nextField as string);
    }
  }, [intelligence.predictions.nextField, form]);

  const focusField = useCallback((field: keyof T) => {
    form.setFocus(field as string);
  }, [form]);

  const getFieldProgress = useCallback(() => {
    return intelligence.predictions.completionPercentage;
  }, [intelligence.predictions.completionPercentage]);

  const value: SmartFormContextValue<T> = {
    intelligence,
    focusNextField,
    focusField,
    getFieldProgress,
  };

  return (
    <SmartFormContext.Provider value={value}>
      {children}
    </SmartFormContext.Provider>
  );
}

// ============================================================================
// SMART FIELD INDICATOR
// ============================================================================

interface SmartFieldIndicatorProps {
  field: string;
}

export function SmartFieldIndicator({ field }: SmartFieldIndicatorProps) {
  const { intelligence } = useSmartForm();
  const meta = intelligence.fields[field];

  if (!meta) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {meta.validating && <span>Validating...</span>}
      {meta.error && <span className="text-red-500">{meta.error}</span>}
      {meta.dirty && !meta.error && <span className="text-green-500">✓</span>}
    </div>
  );
}

// ============================================================================
// FORM PROGRESS BAR
// ============================================================================

export function FormProgressBar() {
  const { getFieldProgress } = useSmartForm();
  const progress = getFieldProgress();

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="bg-blue-500 h-full transition-all duration-300" data-progress={progress}
      />
    </div>
  );
}

// ============================================================================
// AUTO-SAVE INDICATOR
// ============================================================================

export function AutoSaveIndicator() {
  const { intelligence } = useSmartForm();
  const { autoSave } = intelligence;

  if (!autoSave.enabled) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      {autoSave.saving && <span>Saving...</span>}
      {autoSave.lastSaved && !autoSave.saving && (
        <span>Saved {new Date(autoSave.lastSaved).toLocaleTimeString()}</span>
      )}
      {autoSave.error && <span className="text-red-500">{autoSave.error}</span>}
    </div>
  );
}

// All exports are done inline above - no duplicate exports needed
