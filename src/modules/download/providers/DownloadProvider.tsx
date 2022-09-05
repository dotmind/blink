import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
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
};

const DownloadContext = createContext<DownloadContextType>({
  file: undefined,
  fileName: undefined,
  expiresIn: undefined,
});

interface IProps {
  children: React.ReactNode;
}

function DownloadProvider({ children }: IProps) {
  const { id } = useParams();
  const [file, setFile] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const { fingerprint } = useApp();

  const fileLoaded = useMemo(() => file || fileName || expiresIn, [file, fileName, expiresIn]);
  const canDownload = useMemo(() => !!fingerprint && !fileLoaded, [fingerprint, fileLoaded]);

  const downloadFile = useCallback(async () => {
    const jwk = await extractJwkFromUrl();
    const key = await importKey(jwk);

    const { file: buffer, filename, expireAt } = await receiveFile(fingerprint, id as string);
    const base64 = await decryptWithKey(key, new Uint8Array(buffer.data));
    const calculatedExpireAt = new Date(expireAt).getTime() + EXPIRATION_TIME;

    setFile(base64);
    setFileName(filename);
    setExpiresIn(calculatedExpireAt);
  }, [fingerprint, id]);

  useEffect(() => {
    if (canDownload) {
      downloadFile();
    }
  }, []);

  const value = useMemo(() => ({ file, fileName, expiresIn }), [file, fileName, expiresIn]);

  return <DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>;
}

export const useDownload = () => useContext(DownloadContext);

export default DownloadProvider;
