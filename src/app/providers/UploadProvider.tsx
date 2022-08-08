import { useState, createContext, useContext } from 'react';

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type UploadContextType = {
  file: string | ArrayBuffer | null;
  setFile: (file: string | ArrayBuffer | null) => void;
  shareUrl: string | null;
  setShareUrl: (shareUrl: string | null) => void;
  status: UploadStatus;
  setStatus: (status: UploadStatus) => void;
};

const UploadContext = createContext<UploadContextType>({
  file: null,
  setFile: () => {},
  shareUrl: null,
  setShareUrl: () => {},
  status: UploadStatus.IDLE,
  setStatus: () => {}
});


interface Props {
  children: React.ReactNode;
}

const UploadProvider = ({ children }: Props) => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);

  return (
    <UploadContext.Provider
      value={{
        file,
        setFile,
        shareUrl,
        setShareUrl,
        status,
        setStatus
      }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
