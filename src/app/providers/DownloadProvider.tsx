import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { receiveFile } from '@/app/services/api';
import { extractJwkFromUrl } from '@/app/services/navigator';
import { decryptWithKey, importKey } from '@/app/services/crypto';

export type DownloadContextType = {
  file?: string;
  setFile: (file: string) => void;
  fileName?: string;
  setFileName: (fileName: string) => void;
};

const DownloadContext = createContext<DownloadContextType>({
  file: undefined,
  setFile: () => {},
  fileName: undefined,
  setFileName: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function DownloadProvider({ children }: IProps) {
  const { id } = useParams();
  const [file, setFile] = useState<string>();
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    (async () => {
      const jwk = await extractJwkFromUrl();
      const key = await importKey(jwk);

      const { file: buffer, filename } = await receiveFile(id as string);
      const base64 = await decryptWithKey(key, new Uint8Array(buffer.data));

      setFile(base64);
      setFileName(filename);
    })();
  }, []);

  const value = useMemo(() => ({ file, setFile, fileName, setFileName }), [file, fileName]);

  return <DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>;
}

export const useDownload = () => useContext(DownloadContext);

export default DownloadProvider;
