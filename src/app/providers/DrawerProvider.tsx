import { createContext, useContext, useState, useMemo, useCallback, ReactNode, useEffect } from 'react';

import { useApp } from '@/app/providers/AppProdiver';
import { extractFilePath } from '@/app/services/file';
import { extractJwkFromUrl } from '@/app/services/navigator';
import { decryptWithKey, importKey } from '@/app/services/crypto';
import { receiveFile } from '@/app/services/api';

export type DrawerContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setUrl: (url: string) => void;
  file: string;
  fileName: string;
  isLoading: boolean;
};

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  setUrl: () => {},
  file: '',
  fileName: '',
  isLoading: false,
});

interface IProps {
  children: ReactNode;
}

function DrawerProvider({ children }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const { fingerprint } = useApp();

  const canDownload = useMemo(() => !!fingerprint && !!url, [fingerprint, url]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    (async () => {
      if (canDownload) {
        setIsLoading(true);
        try {
          const jwk: string = await extractJwkFromUrl(url);
          const path = extractFilePath(url);
          const key = await importKey(jwk);

          const { file: buffer, filename } = await receiveFile(fingerprint, path as string);
          const base64: string = await decryptWithKey(key, new Uint8Array(buffer.data));

          setFile(base64);
          setFileName(filename);
        } catch (e) {
          console.error(e);
        }
        setIsLoading(false);
      }
    })();
  }, [url]);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      setUrl,
      file,
      fileName,
      isLoading,
    }),
    [isOpen, open, close, setUrl, file, fileName, isLoading],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export const useDrawer = () => useContext(DrawerContext);

export default DrawerProvider;
