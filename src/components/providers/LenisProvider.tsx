'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * LenisProvider — mounts Lenis smooth scroll globally.
 * Elementis uses Lenis for its signature buttery scroll feel.
 * Renders nothing — purely a side-effect component.
 */
export function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
    });

    // Use a running flag to properly cancel the recursive RAF loop
    let running = true;

    function raf(time: number) {
      lenis.raf(time);
      if (running) requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      running = false;
      lenis.destroy();
    };
  }, []);

  return null;
}
