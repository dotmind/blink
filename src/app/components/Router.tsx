import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useWindowSize from '@/app/hooks/useWindowSize';

const Loader = lazy(() => import('@/app/components/Loader'));
const Home = lazy(() => import('@/app/pages/Home'));
const Preview = lazy(() => import('@/app/pages/Preview'));
const Error404 = lazy(() => import('@/app/pages/Error404'));

function Router(): JSX.Element {
  const { height } = useWindowSize();

  return (
    <BrowserRouter>
      <div className={'App'} style={{ height }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={':id'} element={<Preview />} />
            <Route path={'*'} element={<Error404 />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default Router;
