import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

export type DrawerContextType = {
  isOpen: boolean;
  isClosing: boolean;
  open: (url: string) => void;
  close: () => void;
};

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  isClosing: false,
  open: () => {},
  close: () => {},
});

interface IProps {
  children: ReactNode;
}

function DrawerProvider({ children }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const { setUrl } = useDownload();

  const open = useCallback(
    (link: string) => {
      setUrl(link);
      setIsOpen(true);
    },
    [setIsOpen],
  );

  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400);
  }, [setIsOpen, setIsClosing]);

  const value = useMemo(
    () => ({
      isOpen,
      isClosing,
      open,
      close,
    }),
    [isOpen, isClosing, open, close],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export const useDrawer = () => useContext(DrawerContext);

export default DrawerProvider;
