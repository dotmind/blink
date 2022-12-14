import { useState, createContext, useContext, useMemo } from 'react';

import useHistory, { HistoryItem } from '@/app/hooks/useHistory';

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
  filename?: string;
  setFilename: (filename: string | undefined) => void;
  error?: Error;
  setError: (error: Error) => void;
  history: HistoryItem[];
  addToHistory: (file: { filename: string; url: string }) => void;
  fileWeight: number;
  setFileWeight: (fileWeight: number) => void;
  isDragActive: boolean;
  setIsDragActive: (isDragActive: boolean) => void;
};

const UploadContext = createContext<UploadContextType>({
  file: undefined,
  setFile: () => {},
  shareUrl: undefined,
  setShareUrl: () => {},
  status: UploadStatus.IDLE,
  setStatus: () => {},
  filename: undefined,
  setFilename: () => {},
  error: undefined,
  setError: () => {},
  history: [],
  addToHistory: () => {},
  fileWeight: 0,
  setFileWeight: () => {},
  isDragActive: false,
  setIsDragActive: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function UploadProvider({ children }: IProps): JSX.Element {
  const [file, setFile] = useState<string | ArrayBuffer>();
  const [shareUrl, setShareUrl] = useState<string>();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [filename, setFilename] = useState<string>();
  const [error, setError] = useState<Error>();
  const { history, addToHistory } = useHistory();
  const [fileWeight, setFileWeight] = useState<number>(0);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      file,
      setFile,
      shareUrl,
      setShareUrl,
      status,
      setStatus,
      filename,
      setFilename,
      error,
      setError,
      history,
      addToHistory,
      fileWeight,
      setFileWeight,
      isDragActive,
      setIsDragActive,
    }),
    [file, shareUrl, status, filename, error, history, addToHistory, fileWeight, setFileWeight, isDragActive, setIsDragActive],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
