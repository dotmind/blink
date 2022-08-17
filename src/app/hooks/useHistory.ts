import { Dispatch, SetStateAction, useEffect } from 'react';

import usePersistState from '@/app/hooks/usePersistState';
import { LOCAL_KEY_VERSION } from '@/app/constants/storage';

export type HistoryItem = {
  filename: string;
  url: string;
  expiresAt: string;
};

const useHistory = (): {
  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
  addToHistory: (item: HistoryItem) => void;
  purge: () => void;
} => {
  const [history, setHistory, purge] = usePersistState<HistoryItem[]>(`files_history_${LOCAL_KEY_VERSION}`, []);

  useEffect(() => {
    const cleanExpiredHistory = history.filter((item) => new Date(item.expiresAt) > new Date());
    if (cleanExpiredHistory.length !== history.length) {
      setHistory(cleanExpiredHistory);
    }
  }, [history]);

  const addToHistory = (item: HistoryItem): void => {
    setHistory([...history, item]);
  };

  return { history, setHistory, addToHistory, purge };
};

export default useHistory;
