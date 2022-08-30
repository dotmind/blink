import { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useIsMobile from '@/app/hooks/useIsMobile';
import UploadProvider from '@/modules/upload/providers/UploadProvider';
import DownloadProvider from '@/modules/download/providers/DownloadProvider';
import Loader from '@/app/components/Loader';

const Upload = lazy(() => import('@/modules/upload/components/Upload'));
const Footer = lazy(() => import('@/app/components/Footer'));
const About = lazy(() => import('@/app/components/About'));
const FileViewer = lazy(() => import('@/modules/download/components/FileViewer'));
const CircleWaves = lazy(() => import('@/app/components/CircleWaves'));
const InstallPwa = lazy(() => import('@/app/components/InstallPwa'));

function Router() {
  const isMobile = useIsMobile();

  const app = useMemo(
    () => (
      <BrowserRouter>
        <div className={'App'}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route
                path={'/'}
                element={
                  <UploadProvider>
                    <Upload />
                    <About />
                    <Footer />
                    <InstallPwa />
                  </UploadProvider>
                }
              />
              <Route
                path={':id'}
                element={
                  <DownloadProvider>
                    <FileViewer />
                    <CircleWaves />
                    {isMobile && <About />}
                    <Footer />
                    <InstallPwa />
                  </DownloadProvider>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    ),
    [isMobile],
  );

  return app;
}

export default Router;
