import { useCallback, useEffect } from 'react';

import usePersistState from '@/app/hooks/usePersistState';
import { LOCAL_KEY_VERSION } from '@/app/constants/storage';
import { FILE_EXPIRATION_TIME } from '@/app/constants/file';

/* eslint-disable-next-line no-eval */
const EXPIRATION_TIME = eval(FILE_EXPIRATION_TIME);

export type HistoryItem = {
  filename: string;
  url: string;
  expiresAt: string;
};

const useHistory = (): {
  history: HistoryItem[];
  addToHistory: (item: { filename: string; url: string }) => void;
} => {
  const [history, setHistory] = usePersistState<HistoryItem[]>(`files_history_${LOCAL_KEY_VERSION}`, []);

  useEffect(() => {
    const cleanExpiredHistory = history.filter((item) => new Date(item.expiresAt) > new Date());
    if (cleanExpiredHistory.length !== history.length) {
      setHistory([...cleanExpiredHistory]);
    }
  }, [history, setHistory]);

  const addToHistory = useCallback(
    ({ filename, url }: { filename: string; url: string }): void => {
      const expiresAt = new Date(Date.now() + EXPIRATION_TIME).toISOString();
      const item = {
        filename,
        url,
        expiresAt,
      };

      setHistory((prevState) => [...prevState, item]);
    },
    [setHistory],
  );

  return { history, addToHistory };
};

export default useHistory;
