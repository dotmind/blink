import { useMemo } from 'react';

import useWindowSize from '@/app/hooks/useWindowSize';

export default function useIsMobile(): boolean {
  const { width } = useWindowSize();
  return useMemo(() => width < 992, [width]);
}

// Smartphone
export function useIsSmallDevice(): boolean {
  const { width } = useWindowSize();
  return useMemo(() => width < 576, [width]);
}

// Horizontal Tablet
export function useIsMediumDevice(): boolean {
  const { width } = useWindowSize();
  return useMemo(() => width <= 1024, [width]);
}
