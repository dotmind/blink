import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UploadProvider from '@/app/providers/UploadProvider';
import Upload from '@/app/components/Upload';
import Download from '@/app/components/Download';
import DownloadProvider from '@/app/providers/DownloadProvider';
import FileViewer from '@/app/components/FileViewer';

// @TODO: Lazy load routes
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <UploadProvider>
              <Upload />
            </UploadProvider>
          }
        />

        <Route
          path=':id'
          element={
            <DownloadProvider>
              <FileViewer />
              <Download />
            </DownloadProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
