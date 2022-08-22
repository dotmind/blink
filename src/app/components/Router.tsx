import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UploadProvider from '@/modules/upload/providers/UploadProvider';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import FileViewer from '@/modules/download/components/FileViewer';

// @TODO: Lazy load routes
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <UploadProvider>
              <Upload />
              <About />
            </UploadProvider>
          }
        />

        <Route
          path={':id'}
          element={
            <DownloadProvider>
              <FileViewer />
              {/* <Download /> */}
            </DownloadProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
