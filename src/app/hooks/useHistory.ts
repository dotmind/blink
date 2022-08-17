import { useCallback, useEffect } from 'react';

import usePersistState from '@/app/hooks/usePersistState';
import { LOCAL_KEY_VERSION } from '@/app/constants/storage';

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
  }, [history]);

  const addToHistory = useCallback(({ filename, url }: { filename: string; url: string }): void => {
    // @todo Put expire at in constant and env file
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();
    const item = {
      filename,
      url,
      expiresAt,
    };

    setHistory((prevState) => [...prevState, item]);
  }, []);

  return { history, addToHistory };
};

export default useHistory;
