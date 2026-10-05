'use client';

/**
 * @file FeatureSlideshow.tsx
 * @description Framer Motion upgraded slideshow. Exact Elementis "wellness-slideshow".
 * Fully mobile responsive using CSS Grid on desktop and Flex column + order on mobile.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

const SLIDES = [
  {
    num: '01', label: 'Business & Commerce', title: 'Where innovation\nmeets strategy.',
    desc: 'Our Business & Commerce programme equips students with hands-on entrepreneurial experience, financial thinking, and the analytical skills to thrive in a rapidly evolving world.',
    cta: { label: 'Explore Business', href: '/academics' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
  },
  {
    num: '02', label: 'Arts & Humanities', title: 'Creativity that\nshapes the world.',
    desc: 'From literature and philosophy to fine arts and music, our Humanities programme nurtures empathy, critical thought, and the ability to communicate with power and clarity.',
    cta: { label: 'Explore Humanities', href: '/academics' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
  },
  {
    num: '03', label: 'Sports & Wellbeing', title: 'A strong body,\na stronger mind.',
    desc: 'World-class facilities for football, basketball, swimming, and athletics. We believe physical excellence and mental resilience are the foundation of a complete education.',
    cta: { label: 'Explore Student Life', href: '/student-life' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw',
  },
  {
    num: '04', label: 'Leadership & Community', title: 'Leaders who\nserve and inspire.',
    desc: 'Through student councils, social initiatives, and mentorship programmes, we develop confident young leaders who understand their responsibility to the wider community.',
    cta: { label: 'See Community', href: '/student-life' },
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ',
  },
];

const imageVariants = {
  enter: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
    scale: 1.08,
  }),
  center: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1.2, ease: EASE },
  },
  exit: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
    scale: 1,
    transition: { duration: 1, ease: EASE },
  }),
};

const titleVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? '120%' : '-120%' }),
  center: (i: number) => ({ y: '0%', transition: { duration: 0.9, ease: EASE, delay: 0.05 + i * 0.08 } }),
  exit: (direction: number) => ({ y: direction > 0 ? '-120%' : '120%', transition: { duration: 0.7, ease: EASE } }),
};

const descVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay: 0.2 } },
  exit: (direction: number) => ({ y: direction > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.5, ease: EASE } }),
};

function NumberSlot({ value, total }: { value: string; total: number }) {
  return (
    <div style={{ display: 'flex', gap: '0.25em', alignItems: 'baseline', fontSize: 'clamp(0.75rem, 0.97vw, 0.875rem)', fontWeight: 300 }}>
      <span style={{ color: 'var(--color-sand)' }}>{value}</span>
      <span style={{ color: 'rgba(209,204,191,0.4)' }}>/ {String(total).padStart(2, '0')}</span>
    </div>
  );
}

export function FeatureSlideshow() {
  const { t, tArr } = useT();
  const tItems = tArr<{ label: string, title: string, desc: string, cta: string }>('home.programs.items');
  const [[page, direction], setPage] = useState([0, 0]);
  const total = SLIDES.length;
  const imageIndex = ((page % total) + total) % total;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  const slide = SLIDES[imageIndex];

  return (
    <section className="bg-navy-alt relative overflow-hidden py-16 md:py-32 lg:py-40">
      
      {/* ── Header ── */}
      <div className="container-page mb-10 md:mb-24">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-accent" />
          <span className="text-accent text-xs tracking-[0.2em] uppercase font-light">
            {t('home.programs.overline')}
          </span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="container-page flex flex-col md:grid md:grid-cols-12 md:items-start gap-y-10 md:gap-x-6 relative">
        
        {/* 1. Number (Mobile: Order 1, Desktop: Col 1/2) */}
        <div className="order-1 md:order-none md:col-start-1 md:col-end-2 md:pt-2">
          <NumberSlot value={slide.num} total={total} />
        </div>

        {/* 2. Image Reveal (Mobile: Order 2, Desktop: Col 8/13) */}
        <div className="order-2 md:order-none md:col-start-8 md:col-end-13 md:row-start-1 md:row-end-5 relative w-full h-[60vw] md:h-[45vw] max-h-[700px] min-h-[300px] overflow-hidden rounded-sm">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={imageVariants}
              initial="enter" animate="center" exit="exit"
              className="absolute inset-0 overflow-hidden"
            >
              <Image src={slide.img} alt={tItems[imageIndex]?.label || slide.label} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-black/20" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="absolute bottom-6 left-6 text-[0.65rem] md:text-xs font-light tracking-[0.15em] uppercase text-white/80"
              >
                {tItems[imageIndex]?.label || slide.label}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Title (Mobile: Order 3, Desktop: Col 1/6, Row 2) */}
        <div className="order-3 md:order-none md:col-start-1 md:col-end-6 md:row-start-2 relative h-[8rem] md:h-[14vw] max-h-[200px] mt-4 md:mt-10 overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={page} custom={direction} className="absolute inset-0">
              {(tItems[imageIndex]?.title || slide.title).split('\n').map((line, li) => (
                <div key={li} className="overflow-hidden" style={{ marginTop: li === 0 ? 0 : '0.05em' }}>
                  <motion.div
                    custom={li} variants={titleVariants}
                    initial="enter" animate="center" exit="exit"
                    className="text-4xl md:text-[clamp(2.5rem,4.17vw,4.5rem)] font-light leading-none tracking-tight text-sand"
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Description & Nav (Mobile: Order 4, Desktop: Col 3/7, Row 3 & 4) */}
        <div className="order-4 md:order-none md:col-start-3 md:col-end-7 md:row-start-3 relative h-[12rem] md:h-[13vw] max-h-[220px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div key={page} custom={direction} variants={descVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0">
              <p className="text-base md:text-lg font-light leading-relaxed text-sand/70 max-w-sm">
                {tItems[imageIndex]?.desc || slide.desc}
              </p>
              <Link href={slide.cta.href} className="el-link inline-flex items-center gap-3 mt-6 text-sm font-light text-sand/60">
                <span>{tItems[imageIndex]?.cta || slide.cta.label}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows - Desktop: Col 3/7, Row 4. Mobile: Order 5 */}
        <div className="order-5 md:order-none md:col-start-3 md:col-end-7 md:row-start-4 flex items-center gap-6 mt-0 md:mt-12 z-10">
          <button onClick={() => paginate(-1)} aria-label="Previous slide" className="flex items-center justify-center p-2 -ml-2 text-sand/50 hover:text-sand transition-colors">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="rotate-180"><path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => paginate(1)} aria-label="Next slide" className="flex items-center justify-center p-2 text-sand/50 hover:text-sand transition-colors">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="container-page mt-12 md:mt-24">
        <div className="h-[2px] bg-sand/15 relative overflow-hidden">
          <motion.div
            initial={false} animate={{ scaleX: (imageIndex + 1) / total }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-0 bg-sand origin-left"
          />
        </div>
      </div>
    </section>
  );
}
