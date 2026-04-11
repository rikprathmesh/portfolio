import { useState, useEffect } from 'react';

/**
 * Reactive hook that returns true when viewport width is below the given breakpoint.
 * Updates automatically on window resize, making all responsive styles live.
 * @param {number} breakpoint - Width in pixels to consider "mobile" (default: 768)
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches); // sync on mount
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}
