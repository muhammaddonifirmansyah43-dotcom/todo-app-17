'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

type SetValue<T> = T | ((currentValue: T) => T);

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // Subscribe ke perubahan Local Storage
  const subscribe = useCallback((listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Mengambil data dari Local Storage
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') {
      return JSON.stringify(initialValue);
    }

    const storedValue = window.localStorage.getItem(key);

    // Jika belum ada data, gunakan initialValue
    return storedValue ?? JSON.stringify(initialValue);
  }, [key, initialValue]);

  // Nilai yang digunakan saat Server Rendering
  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Parse JSON dengan aman
  const value = useMemo(() => {
    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  }, [storedValue, initialValue]);

  // Menyimpan data
  const setValue = useCallback(
    (newValue: SetValue<T>) => {
      if (typeof window === 'undefined') {
        return;
      }

      const currentStoredValue =
        window.localStorage.getItem(key);

      let currentValue: T;

      try {
        currentValue = currentStoredValue
          ? (JSON.parse(currentStoredValue) as T)
          : initialValue;
      } catch {
        currentValue = initialValue;
      }

      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (currentValue: T) => T)(
              currentValue
            )
          : newValue;

      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );

      // Update komponen pada tab yang sama
      notifyListeners();

      // Sinkronisasi antar-tab
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
        })
      );
    },
    [key, initialValue]
  );

  return [value, setValue];
}