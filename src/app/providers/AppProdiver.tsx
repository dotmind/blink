import { useContext, createContext, useMemo, useEffect } from 'react';

import { createFingerprint } from '@/app/services/session';
import usePersisState from '@/app/hooks/usePersistState';
import { LOCAL_KEY_VERSION } from '@/app/constants/storage';

export type AppContextType = {
  fingerprint: string;
};

const AppContext = createContext<AppContextType>({
  fingerprint: '',
});

interface IProps {
  children: React.ReactNode;
}

function AppProvider({ children }: IProps) {
  const [fingerprint, setFingerprint] = usePersisState<string>(`fingerprint_${LOCAL_KEY_VERSION}`, '');

  useEffect(() => {
    (async () => {
      setFingerprint(await createFingerprint());
    })();
  }, []);

  const value = useMemo(() => ({ fingerprint }), [fingerprint]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

export default AppProvider;
