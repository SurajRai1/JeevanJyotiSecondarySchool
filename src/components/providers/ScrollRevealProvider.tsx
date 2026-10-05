'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollRevealProvider — Elementis-style IntersectionObserver.
 * Triggers on: .reveal, .reveal-slow, .masking-text
 *
 * Re-runs on every pathname change so SPA navigation works correctly.
 * For .masking-text elements, it reveals child .line elements
 * with a staggered translateY(120%) → translateY(0) transition.
 */
export function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let the new page content render before querying
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal, .reveal-slow, .masking-text');
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); // Re-run on every route change

  return null;
}
