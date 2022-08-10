import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UploadProvider from '@/app/providers/UploadProvider';
import Upload from '@/app/components/Upload';
import Download from '@/app/components/Download';

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

        <Route path=':id' element={<Download />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
