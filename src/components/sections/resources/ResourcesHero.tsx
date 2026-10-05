'use client';

/**
 * @file ResourcesHero.tsx
 * @description Elementis-style editorial hero for Resources page with search.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ResourcesHero() {
  const { t } = useT();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '75svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4UyU1bXWRax8KQ1W6KfA1DXisHiZFV_DjvZc9UkaCPw0qUHpM-lCBiRss_FyY1l_wMCJsz4SWmAlHsMp2bydHnRE5I1VbKzdHTfCbfIDqYPNj7bkAfY_pBA0HVFvAxqW_uXEDw2ru24tu_CkwIHtcNxJF-sqfUdgJ-ygE2l0HKJH-xR-lbWHmxWlYhxKz0CpgoaYUl_5v7Dm5NXRJdOFYNZ7uk_nqTMs6AHhxQjFyJpIoRzeBDhKXLQ"
          alt="Jeevan Jyoti Library and Digital Repository"
          fill
          priority
          sizes="100vw"
          style={{ opacity: 0.25 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,30,0.65) 0%, rgba(10,15,30,0.3) 40%, rgba(10,15,30,0.95) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned */}
      <div
        className="container-page relative z-10 flex flex-col justify-end"
        style={{
          minHeight: '75svh',
          paddingBottom: 'clamp(3rem, 6vw, 5.5rem)',
          paddingTop: 'clamp(7.5rem, 11vw, 9.5rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <span className="block h-px w-8 md:w-12 bg-accent" />
          <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
            Knowledge Repository
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="text-white font-light leading-none tracking-tight max-w-4xl mb-8"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          {t('resources.hero.headline1')}{' '}
          <em className="not-italic text-accent" style={{ fontWeight: 200 }}>
            {t('resources.hero.headline2')}
          </em>
        </motion.h1>

        {/* Bottom row: Subtitle + Architectural Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8"
          style={{ borderTop: '1px solid rgba(209,204,191,0.15)' }}
        >
          <p
            className="font-light leading-relaxed max-w-lg text-sand/80"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
          >
            {t('resources.hero.body')}
          </p>

          {/* Search Box */}
          <div className="w-full max-w-md">
            <div
              className="relative flex items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(209, 204, 191, 0.2)',
              }}
            >
              <span className="material-symbols-outlined absolute left-4 text-sand/40" style={{ fontSize: 20 }}>
                search
              </span>
              <input
                type="text"
                placeholder={t('resources.hero.searchPlaceholder')}
                className="w-full bg-transparent py-4 pl-12 pr-4 text-sand placeholder:text-sand/40 focus:outline-none font-light text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
