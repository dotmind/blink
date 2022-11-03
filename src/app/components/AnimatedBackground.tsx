import { useEffect } from 'react';

import { Gradient } from '@/app/services/gradient';

function AnimatedBackground() {
  const gradient = new Gradient();

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    gradient.initGradient('#gradient');
  }, []);

  return <canvas id={'gradient'} data-transition-in />;
}

export default AnimatedBackground;
