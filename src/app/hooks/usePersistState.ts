import { Dispatch, SetStateAction, useState, useMemo, useCallback, useEffect } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStorage {
  set: (key: string, value: any) => void;
  get: (key: string, defaultValue: string) => string;
  remove: (key: string) => void;
}

const storage: IStorage = {
  set: (key: string, value: string) => localStorage.setItem(key, value),
  get: (key: string, defaultValue: any) => localStorage.getItem(key) || defaultValue,
  remove: (key: string) => localStorage.removeItem(key),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const usePersisState = <T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const isBrowser = useMemo(() => typeof window !== 'undefined', []);

  const [state, setState] = useState(() => {
    if (isBrowser) {
      return JSON.parse(storage.get(key, JSON.stringify(defaultValue)));
    }

    return defaultValue;
  });

  const purge = useCallback(() => {
    setState(defaultValue);
    if (isBrowser) {
      storage.remove(key);
    }
  }, [isBrowser, key, defaultValue]);

  useEffect(() => {
    if (!isBrowser) {
      return () => {};
    }

    const handleStorage = () => {
      setState(JSON.parse(storage.get(key, JSON.stringify(defaultValue))));
    };

    window.addEventListener('storage', handleStorage, false);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isBrowser, key, defaultValue]);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    storage.set(key, JSON.stringify(state));
  }, [isBrowser, key, state]);

  return [state, setState, purge];
};

export default usePersisState;
