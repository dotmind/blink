import { useRef, useEffect } from 'react';

import { Gradient } from '@/app/services/gradient';

function AnimatedBackground() {
  const gradient = new Gradient();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) {
      // eslint-disable-next-line
      // @ts-ignore
      gradient.initGradient('#gradient');
    }
  }, []);

  return <canvas ref={canvas} id={'gradient'} data-transition-in />;
}

export default AnimatedBackground;
