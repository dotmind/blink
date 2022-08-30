import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from '@/app/components/Loader';

const Home = lazy(() => import('@/app/pages/Home'));
const Preview = lazy(() => import('@/app/pages/Preview'));

function Router() {
  return (
    <BrowserRouter>
      <div className={'App'}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={':id'} element={<Preview />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Router;
