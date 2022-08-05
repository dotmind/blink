import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UploadProvider from '@/app/providers/UploadProvider';
import Upload from '@/app/components/Upload';
import Download from '@/app/components/Download';

const Router = () => {
  return (
    <BrowserRouter>
      <UploadProvider>
        <Routes>
          <Route path='/' element={<Upload />} />
          <Route path=':id' element={<Download />} />
        </Routes>
      </UploadProvider>
    </BrowserRouter>
  );
};

export default Router;
