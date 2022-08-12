import { useContext, createContext, useMemo, useState, useEffect } from 'react';

import { createFingerprint } from '@/app/services/session';

export type AppContextType = {
  fingerprint: string;
  setFingerprint: (fingerprint: string) => void;
};

const AppContext = createContext<AppContextType>({
  fingerprint: '',
  setFingerprint: () => {},
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

  const value = useMemo(() => ({ fingerprint, setFingerprint }), [fingerprint]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

export default AppProvider;
