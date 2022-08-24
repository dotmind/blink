import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useIsMobile from '@/app/hooks/useIsMobile';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';

const Upload = lazy(() => import('@/modules/upload/components/Upload'));
const Footer = lazy(() => import('@/app/components/Footer'));
const About = lazy(() => import('@/app/components/About'));
const FileViewer = lazy(() => import('@/modules/download/components/FileViewer'));
const CircleWaves = lazy(() => import('@/app/components/CircleWaves'));

// @TODO: Lazy load routes
// @TODO: find a better way to do modify footer based on route
function Router() {
  const isMobile = useIsMobile();

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
                {isMobile && <About />}
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
