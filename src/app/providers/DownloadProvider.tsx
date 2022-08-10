import { createContext, useContext, useState } from 'react'

export type DownloadContextType = {
  file?: string | ArrayBuffer
  setFile: (file: string | ArrayBuffer) => void
  fileName?: string
  setFileName: (fileName: string) => void
}

const DownloadContext = createContext<DownloadContextType>({
  file: undefined,
  setFile: () => {},
  fileName: undefined,
  setFileName: () => {}
});

interface Props {
  children: React.ReactNode;
}

const DownloadProvider = ({ children } :Props) => {
  const [file, setFile] = useState<string | ArrayBuffer>()
  const [fileName, setFileName] = useState<string>()

  return (
    <DownloadContext.Provider
      value={{
        file,
        setFile,
        fileName,
        setFileName
      }}>
      {children}
    </DownloadContext.Provider>
  )
}

export const useDownload = () => useContext(DownloadContext);

export default DownloadProvider