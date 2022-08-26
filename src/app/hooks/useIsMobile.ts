import { useMemo } from 'react';

import useWindowSize from '@/app/hooks/useWindowSize';

export default function useIsMobile(): boolean {
  const { width } = useWindowSize();
  return useMemo(() => width < 992, [width]);
}
