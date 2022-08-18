import { BrowserRouter, Routes, Route } from 'react-router-dom';

// @TODO: Lazy load routes
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<p>Upload</p>} />

        <Route path={':id'} element={<p>Download</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
