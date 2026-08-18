"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Pequeño pub-sub en memoria para notificar a los hooks suscritos a una
 * misma clave cuando `update()` escribe en esta pestaña (el evento nativo
 * "storage" solo se dispara en otras pestañas).
 */
const listeners = new Map<string, Set<() => void>>();

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string, listener: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(listener);

  const onStorage = (e: StorageEvent) => {
    if (e.key === key) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.get(key)?.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** true solo después de montar en el cliente; evita mismatches de hidratación. */
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Hook de estado persistido en localStorage, basado en useSyncExternalStore
 * (sin setState dentro de efectos). Seguro para SSR: hasta que `hydrated`
 * sea true se devuelve `initialValue`.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const hydrated = useHydrated();

  const raw = useSyncExternalStore(
    useCallback((listener) => subscribe(key, listener), [key]),
    useCallback(() => readRaw(key), [key]),
    useCallback(() => null, [])
  );

  let value: T = initialValue;
  if (hydrated && raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initialValue;
    }
  }

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      let prevValue: T = initialValue;
      const prevRaw = readRaw(key);
      if (prevRaw !== null) {
        try {
          prevValue = JSON.parse(prevRaw) as T;
        } catch {
          prevValue = initialValue;
        }
      }
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(prevValue) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // Almacenamiento lleno o no disponible: no persiste, pero no rompe la UI.
      }
      emit(key);
    },
    [key, initialValue]
  );

  return [value, update, hydrated] as const;
}
