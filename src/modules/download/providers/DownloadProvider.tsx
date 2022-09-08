import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { receiveFile } from '@/app/services/api';
import { extractJwkFromUrl } from '@/app/services/navigator';
import { decryptWithKey, importKey } from '@/app/services/crypto';
import { useApp } from '@/app/providers/AppProdiver';
import { FILE_EXPIRATION_TIME } from '@/app/constants/file';

// eslint-disable-next-line no-eval
const EXPIRATION_TIME: number = eval(FILE_EXPIRATION_TIME);

export type DownloadContextType = {
  file?: string;
  fileName?: string;
  expiresIn?: number;
  isLoading: boolean;
  error?: Error;
};

const DownloadContext = createContext<DownloadContextType>({
  file: undefined,
  fileName: undefined,
  expiresIn: undefined,
  isLoading: true,
  error: undefined,
});

interface IProps {
  children: React.ReactNode;
}

function DownloadProvider({ children }: IProps) {
  const { id } = useParams();
  const [file, setFile] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const { fingerprint } = useApp();

  const fileLoaded = useMemo(() => file || fileName || expiresIn, [file, fileName, expiresIn]);
  const canDownload = useMemo(() => !!fingerprint && !fileLoaded, [fingerprint, fileLoaded]);

  useEffect(() => {
    (async () => {
      if (canDownload) {
        const jwk = await extractJwkFromUrl();
        const key = await importKey(jwk);

        try {
          const { file: buffer, filename, expireAt } = await receiveFile(fingerprint, id as string);
          const base64 = await decryptWithKey(key, new Uint8Array(buffer.data));
          const calculatedExpireAt = new Date(expireAt).getTime() + EXPIRATION_TIME;

          setFile(base64);
          setFileName(filename);
          setExpiresIn(calculatedExpireAt);
        } catch (_error) {
          setError(_error as Error);
        }
        setIsLoading(false);
      }
    })();
  }, []);

  const value = useMemo(() => ({ file, fileName, expiresIn, isLoading, error }), [file, fileName, expiresIn, isLoading, error]);

  return <DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>;
}

export const useDownload = () => useContext(DownloadContext);

export default DownloadProvider;
