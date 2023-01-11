import { createContext, useContext, useState, useEffect, useMemo } from 'react';

import { receiveFile } from '@/app/services/api';
import { extractJwkFromUrl } from '@/app/services/navigator';
import { decryptWithKey, importKey } from '@/app/services/crypto';
import { useApp } from '@/app/providers/AppProdiver';
import { FILE_EXPIRATION_TIME } from '@/app/constants/file';
import { extractFilePath } from '@/app/services/file';

// eslint-disable-next-line no-eval
const EXPIRATION_TIME: number = eval(FILE_EXPIRATION_TIME);

export type DownloadContextType = {
  file?: string;
  fileName?: string;
  expiresIn?: number;
  isLoading: boolean;
  error?: Error;
  url?: string;
  setUrl: (url: string) => void;
};

const DownloadContext = createContext<DownloadContextType>({
  file: undefined,
  fileName: undefined,
  expiresIn: undefined,
  isLoading: true,
  error: undefined,
  url: undefined,
  setUrl: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function DownloadProvider({ children }: IProps): JSX.Element {
  const [url, setUrl] = useState<string>(window.location.toString());
  const [file, setFile] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const { fingerprint } = useApp();

  const canDownload = useMemo(() => !!fingerprint && !!url, [fingerprint, url]);

  useEffect(() => {
    (async () => {
      if (canDownload) {
        setIsLoading(true);
        try {
          const path = extractFilePath(url);
          const jwk: string = await extractJwkFromUrl(url);
          const key: CryptoKey = await importKey(jwk);

          const { file: buffer, filename, expireAt } = await receiveFile(fingerprint, path as string);
          const base64: string = await decryptWithKey(key, new Uint8Array(buffer.data));
          const calculatedExpireAt: number = new Date(expireAt).getTime() + EXPIRATION_TIME;

          setFile(base64);
          setFileName(filename);
          setExpiresIn(calculatedExpireAt);
        } catch (_error) {
          setError(_error as Error);
        }
        setIsLoading(false);
      }
    })();
  }, [url]);

  const value = useMemo(
    () => ({ file, fileName, expiresIn, isLoading, error, url, setUrl }),
    [file, fileName, expiresIn, isLoading, error, url, setUrl],
  );

  return <DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>;
}

export const useDownload = () => useContext(DownloadContext);

export default DownloadProvider;
