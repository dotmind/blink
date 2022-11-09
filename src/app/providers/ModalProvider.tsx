import { createContext, useContext, useState, useMemo, useCallback } from 'react';

export type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function ModalProvider({ children }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [isOpen],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
