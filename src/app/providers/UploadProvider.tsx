import { useState, createContext, useContext, useEffect } from 'react';

import { createFingerprint } from '@/app/services/session';

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type UploadContextType = {
  file?: string | ArrayBuffer;
  setFile: (file: string | ArrayBuffer | undefined) => void;
  shareUrl?: string;
  setShareUrl: (shareUrl: string) => void;
  status: UploadStatus;
  setStatus: (status: UploadStatus) => void;
  fingerprint: string;
  filename?: string;
  setFilename: (filename: string | undefined) => void;
};

const UploadContext = createContext<UploadContextType>({
  file: undefined,
  setFile: () => {},
  shareUrl: undefined,
  setShareUrl: () => {},
  status: UploadStatus.IDLE,
  setStatus: () => {},
  fingerprint: '',
  filename: undefined,
  setFilename: () => {},
});

interface Props {
  children: React.ReactNode;
}

const UploadProvider = ({ children }: Props) => {
  const [file, setFile] = useState<string | ArrayBuffer>();
  const [shareUrl, setShareUrl] = useState<string>();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [fingerprint, setFingerprint] = useState<string>('');
  const [filename, setFilename] = useState<string>();

  useEffect(() => {
    (async () => {
      setFingerprint(await createFingerprint());
    })();
  }, []);

  return (
    <UploadContext.Provider
      value={{
        file,
        setFile,
        shareUrl,
        setShareUrl,
        status,
        setStatus,
        fingerprint,
        filename,
        setFilename,
      }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
