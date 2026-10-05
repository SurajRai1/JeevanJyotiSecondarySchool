'use client';

/**
 * @file HeroSlider.tsx
 * @description A highly responsive, full-screen image slider for the homepage hero.
 * Replaces the static HeroSection to add dynamic motion and visual interest.
 */

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/lib/constants';
import { useT } from '@/hooks/useT';

const HERO_SLIDES = [
  {
    id: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
    alt: 'Main Campus Building',
  },
  {
    id: 2,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
    alt: 'Students in Library',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
    alt: 'Students collaborating',
  }
];

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function HeroSlider() {
  const { t } = useT();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* ─── Animated Background Images ─── */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlide].img}
              alt={HERO_SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover object-center"
              style={{ opacity: 0.45 }}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays — Elementis uses a subtle top-down gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(10,15,30,0.7) 0%, rgba(10,15,30,0.3) 40%, rgba(10,15,30,0.8) 100%)',
          }}
        />
      </div>

      {/* ─── Hero Content — bottom-left aligned ─── */}
      <div
        className="container-page relative z-10 flex flex-col justify-end h-full"
        style={{ minHeight: '100svh', paddingBottom: 'clamp(3rem, 6vw, 6rem)', paddingTop: 'clamp(8rem, 12vw, 10rem)' }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <span className="block h-px w-8 md:w-12 bg-accent" />
          <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
            Est. {SITE.founded} · Sunsari, Nepal
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-white font-light leading-none tracking-tight max-w-5xl"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 9rem)', // Adjusted for mobile responsiveness
            letterSpacing: '-0.02em',
          }}
        >
          {t('site.tagline').split(' ').map((word, i, arr) => (
            <span key={i}>
              {i === Math.floor(arr.length / 2) ? (
                <span className="italic" style={{ fontWeight: 200, opacity: 0.9 }}>
                  {' ' + word + ' '}
                </span>
              ) : (
                word + (i < arr.length - 1 ? ' ' : '')
              )}
            </span>
          ))}
        </h1>

        {/* Bottom row: description + CTA + Slider Controls */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-16"
          style={{ borderTop: '1px solid rgba(209,204,191,0.15)', paddingTop: 'clamp(1.5rem, 3vw, 3rem)' }}
        >
          <div className="flex flex-col gap-6">
            <p
              className="font-light leading-relaxed max-w-md text-sand/70"
              style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)' }}
            >
              {t('site.description')}
            </p>
            
            {/* Slider Dots */}
            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="group py-2 focus:outline-none"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div 
                    className={`h-px transition-all duration-500 ease-out ${i === currentSlide ? 'w-8 bg-sand' : 'w-4 bg-sand/30 group-hover:bg-sand/60'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div 
            className="flex flex-col items-center gap-3 self-start md:self-end group cursor-pointer mt-4 md:mt-0" 
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span
              className="uppercase tracking-[0.25em] group-hover:opacity-100 transition-opacity text-[10px] text-sand/40 opacity-60"
            >
              {t('home.hero.dragHint')}
            </span>
            <div className="relative overflow-hidden w-px h-12 md:h-[72px] bg-sand/20">
              <div
                className="absolute top-0 left-0 w-full bg-white h-full"
                style={{ animation: 'slideDown 2s cubic-bezier(0.24,0.43,0.15,0.97) infinite' }}
              />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
