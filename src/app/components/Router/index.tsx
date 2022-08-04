import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from '../Upload';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path=":id" element={<div>TODO: download file</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
