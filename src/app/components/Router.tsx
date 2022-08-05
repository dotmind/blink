import UploadProvider from '@/app/providers/UploadProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from '@/app/components/Upload';

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
        <Route path=':id' element={<div>TODO: download file</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
