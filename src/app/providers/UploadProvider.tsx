import { useState, createContext, useContext } from 'react';

export type UploadContextType = {
  file: string | null;
  setFile: (file: string | null) => void;
};

const UploadContext = createContext<UploadContextType>({
  file: null,
  setFile: () => {},
});

interface Props {
  children: React.ReactNode[];
}

const UploadProvider = ({ children }: Props) => {
  const [file, setFile] = useState<string | null>(null);

  return <UploadContext.Provider value={{ file, setFile }}>{children}</UploadContext.Provider>;
};

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
