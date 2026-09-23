import { useEffect, useState } from 'react';

/** Typing effect cycling through role titles. Static text when reduced motion is requested. */
export function useTyping(roles: readonly string[]): string {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState<string>(() => {
    if (prefersReducedMotion) {
      return roles[0] ?? '';
    }
    return '';
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout = 0;

    const tick = (): void => {
      const current = roles[roleIndex] ?? '';
      if (isDeleting) {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timeout = window.setTimeout(tick, 400);
        } else {
          timeout = window.setTimeout(tick, 50);
        }
      } else {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = window.setTimeout(tick, 1500);
        } else {
          timeout = window.setTimeout(tick, 80);
        }
      }
    };

    timeout = window.setTimeout(tick, 500);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [roles, prefersReducedMotion]);

  return text;
}