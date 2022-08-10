import { useState, createContext, useContext, useEffect } from 'react';

import { createFingerprint } from '@/app/services/session';

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type UploadContextType = {
  file?: string | ArrayBuffer | null;
  setFile: (file: string | ArrayBuffer | null) => void;
  shareUrl?: string;
  setShareUrl: (shareUrl: string) => void;
  status: UploadStatus;
  setStatus: (status: UploadStatus) => void;
  fingerprint?: string;
  filename?: string | null;
  setFilename: (filename: string | null) => void;
};

const UploadContext = createContext<UploadContextType>({
  file: null,
  setFile: () => {},
  shareUrl: undefined,
  setShareUrl: () => {},
  status: UploadStatus.IDLE,
  setStatus: () => {},
  fingerprint: undefined,
  filename: null,
  setFilename: () => {}
});

interface Props {
  children: React.ReactNode;
}

const UploadProvider = ({ children }: Props) => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [shareUrl, setShareUrl] = useState<string>();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [fingerprint, setFingerprint] = useState<string>();
  const [filename, setFilename] = useState<string | null>(null);

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
        setFilename
      }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
