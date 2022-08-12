import { useContext, createContext, useMemo, useState, useEffect } from 'react';

import { createFingerprint } from '@/app/services/session';

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
  const [fingerprint, setFingerprint] = useState<string>('');

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
