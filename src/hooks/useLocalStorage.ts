import { useCallback } from "react";

interface UseLocalStorageOptions<TValue> {
  key: string;
  fallbackValue: TValue;
  validate: (value: unknown) => value is TValue;
}

interface LocalStorageActions<TValue> {
  resolveStoredValue: () => TValue;
  setStoredValue: (value: TValue) => void;
}

// Returns true when browser localStorage is available.
function resolveCanUseLocalStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

// Parses a JSON string safely and returns undefined when parsing fails.
function resolveParsedValue(serializedValue: string): unknown | undefined {
  try {
    return JSON.parse(serializedValue);
  } catch {
    return undefined;
  }
}

// Provides typed localStorage read and write helpers with fallback handling.
export function useLocalStorage<TValue>({
  key,
  fallbackValue,
  validate,
}: UseLocalStorageOptions<TValue>): LocalStorageActions<TValue> {
  // Resolves a validated stored value or returns the fallback value.
  const resolveStoredValue = useCallback((): TValue => {
    if (!resolveCanUseLocalStorage()) {
      return fallbackValue;
    }

    const serializedValue = window.localStorage.getItem(key);

    if (!serializedValue) {
      return fallbackValue;
    }

    const parsedValue = resolveParsedValue(serializedValue);

    if (parsedValue === undefined) {
      return fallbackValue;
    }

    if (!validate(parsedValue)) {
      return fallbackValue;
    }

    return parsedValue;
  }, [fallbackValue, key, validate]);

  // Saves a value to localStorage using JSON serialization.
  const setStoredValue = useCallback(
    (value: TValue): void => {
      if (!resolveCanUseLocalStorage()) {
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return {
    resolveStoredValue,
    setStoredValue,
  };
}
