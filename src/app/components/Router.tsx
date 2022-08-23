import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from '@/app/components/Footer';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import Upload from '@/modules/upload/components/Upload';
import About from '@/app/components/About';
import FileViewer from '@/modules/download/components/FileViewer';
import CircleWaves from '@/app/components/CircleWaves';

// @TODO: Lazy load routes
// @TODO: find a better way to do modify footer based on route
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <div className={'App upload'}>
              <UploadProvider>
                <Upload />
                <About />
                <Footer />
              </UploadProvider>
            </div>
          }
        />

        <Route
          path={':id'}
          element={
            <div className={'App download'}>
              <DownloadProvider>
                <FileViewer />
                <CircleWaves />
                <Footer />
              </DownloadProvider>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
