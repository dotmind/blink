import { createContext, useContext, useState, useMemo, useCallback, ReactNode, useRef } from 'react';

import { useDownload } from '@/modules/download/providers/DownloadProvider';

export type DrawerContextType = {
  ref: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  open: (url: string) => void;
  close: () => void;
};

const DrawerContext = createContext<DrawerContextType>({
  ref: { current: null },
  isOpen: false,
  open: () => {},
  close: () => {},
});

interface IProps {
  children: ReactNode;
}

function DrawerProvider({ children }: IProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setUrl } = useDownload();

  const open = useCallback(
    (link: string) => {
      setIsOpen(true);
      setUrl(link);
    },
    [setIsOpen],
  );

  const close = useCallback(() => {
    if (drawerRef.current) {
      drawerRef.current.parentElement?.classList.add('closing');
      drawerRef.current.addEventListener('animationend', () => {
        setIsOpen(false);
      });
    }
  }, [drawerRef, setIsOpen]);

  const value = useMemo(
    () => ({
      ref: drawerRef,
      isOpen,
      open,
      close,
    }),
    [drawerRef, isOpen, open, close],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export const useDrawer = () => useContext(DrawerContext);

export default DrawerProvider;
