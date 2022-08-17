import { useState, createContext, useContext, useMemo } from 'react';

import { LOCAL_KEY_VERSION } from '@/app/constants/storage';
import usePersisState from '@/app/hooks/usePersistState';

export enum UploadStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type HistoryItem = {
  filename: string;
  url: string;
  expiresAt: string;
};

export type UploadContextType = {
  file?: string | ArrayBuffer;
  setFile: (file: string | ArrayBuffer | undefined) => void;
  shareUrl?: string;
  setShareUrl: (shareUrl: string) => void;
  status: UploadStatus;
  setStatus: (status: UploadStatus) => void;
  filename?: string;
  setFilename: (filename: string | undefined) => void;
  history: HistoryItem[];
  setHistory: (history: HistoryItem[]) => void;
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
  history: [],
  setHistory: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function UploadProvider({ children }: IProps) {
  const [file, setFile] = useState<string | ArrayBuffer>();
  const [shareUrl, setShareUrl] = useState<string>();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [filename, setFilename] = useState<string>();
  const [history, setHistory] = usePersisState<HistoryItem[]>(`files_history_${LOCAL_KEY_VERSION}`, []);

  const value = useMemo(
    () => ({ file, setFile, shareUrl, setShareUrl, status, setStatus, filename, setFilename, history, setHistory }),
    [file, shareUrl, status, filename],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
