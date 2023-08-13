// Core
import { useCallback, useEffect, useState } from 'react';

export const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: any): void => {
    if ((e as MediaQueryList ).matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    if (media.addEventListener) {
      media.addEventListener('change', updateTarget);
    } else {
      // compatibility for browser that don't have addEventListener
      media.addListener(updateTarget);
    }

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    if (media.removeEventListener) {
      return () => media.removeEventListener('change', updateTarget);
    } else {
      // compatibility for browser that don't have removeEventListener
      return () => media.removeListener(updateTarget);
    }
    // eslint-disable-next-line
  }, []);

  return targetReached;
};
