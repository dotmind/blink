import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from '@/app/components/Loader';

const Home = lazy(() => import('@/app/pages/Home'));
const Preview = lazy(() => import('@/app/pages/Preview'));
const FramePreview = lazy(() => import('@/app/pages/FramePreview'));
const Error404 = lazy(() => import('@/app/pages/Error404'));
const CalculationExplaination = lazy(() => import('@/app/pages/CalculationExplaination'));

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <div className={'App'}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={':id'} element={<Preview />} />
            <Route path={'/frame/:id'} element={<FramePreview />} />
            <Route path={'/explaination'} element={<CalculationExplaination />} />
            <Route path={'*'} element={<Error404 />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Router;
