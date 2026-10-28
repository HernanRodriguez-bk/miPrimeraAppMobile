import { useCallback, useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../services/storage';

type Updater<T> = T | ((prev: T) => T);

/**
 * Custom Hook reutilizable para sincronizar estado React con AsyncStorage,
 * evitando duplicación de hidratación asíncrona y previniendo stale closures.
 */
export function useAsyncStorageState<T>(storageKey: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const storedValue = await getStorageItem<T>(storageKey, initialValue);
        if (isMounted) {
          setState(storedValue);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
    // initialValue se usa solo como fallback inicial de hidratación
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const setPersistentState = useCallback(
    async (updater: Updater<T>): Promise<void> => {
      setState((prev) => {
        const nextValue =
          typeof updater === 'function' ? (updater as (prev: T) => T)(prev) : updater;
        void setStorageItem<T>(storageKey, nextValue);
        return nextValue;
      });
    },
    [storageKey]
  );

  return {
    state,
    setPersistentState,
    isLoading,
  };
}

