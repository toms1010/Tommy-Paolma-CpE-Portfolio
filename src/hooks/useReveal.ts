import { useEffect, useRef, useState } from 'react';

/**
 * Observes an element and reports when it first scrolls into view (for reveal animations).
 * A threshold of 0 ensures tall sections still reveal on small viewports, where showing
 * 10%+ of the element at once is impossible.
 */
export function useReveal<T extends HTMLElement>(
  threshold = 0
): {
  ref: React.RefObject<T | null>;
  visible: boolean;
} {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState<boolean>(
    () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const el = ref.current;
    if (el === null || visible) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [threshold, visible]);

  return { ref, visible };
}
