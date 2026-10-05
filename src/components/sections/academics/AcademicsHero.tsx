'use client';

/**
 * @file AcademicsHero.tsx
 * @description Elementis-style hero for the Academics page — full-bleed image,
 * bottom-aligned editorial typography, matching homepage design language.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function AcademicsHero() {
  const { t } = useT();
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '85svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfBHXz-RSkJWFslXmpoJDetEpG2ej1MmctW7DAEdRORizUo7uEpeYvVSKeD1mndULt6QC6FJPDqIjYOI23_uqKHL38fri_l5O-Hri2D7o1ZMhha0VflkZ3fGWtyWzNS5Emh7xcCfhHR6X98cbaxSsia-3eswkF-nA9DSaiWF7W81TqBVqg3kj6BRH0QH0UW0iP0-8fYyBeSgNYdkN2M1GxVnVfeEOIxf0sdryra0UMks68PZvUHLjrDg"
          alt="Students in a modern classroom"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.35 }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(10,15,30,0.5) 0%, rgba(10,15,30,0.3) 40%, rgba(10,15,30,0.85) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned */}
      <div
        className="container-page relative z-10 flex flex-col justify-end"
        style={{ minHeight: '85svh', paddingBottom: 'clamp(3rem, 6vw, 6rem)', paddingTop: 'clamp(8rem, 12vw, 10rem)' }}
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
            {t('academics.hero.label')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="text-white font-light leading-none tracking-tight max-w-4xl mb-10"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
        >
          {t('academics.hero.headline1')}{' '}
          <em className="not-italic" style={{ fontWeight: 200, opacity: 0.7 }}>
            {t('academics.hero.headline2')}
          </em>
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          style={{ borderTop: '1px solid rgba(209,204,191,0.15)', paddingTop: 'clamp(1.5rem, 3vw, 3rem)' }}
        >
          <p
            className="font-light leading-relaxed max-w-lg"
            style={{ color: 'rgba(209,204,191,0.7)', fontSize: 'clamp(0.875rem, 1.1vw, 1.1rem)' }}
          >
            {t('academics.hero.body')}
          </p>

          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100"
              style={{
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-sand)',
                padding: 'clamp(0.75rem, 1vw, 1rem) clamp(1.5rem, 2vw, 2rem)',
                fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
              }}
            >
              {t('academics.hero.downloadProspectus')}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </button>
            <button
              className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100"
              style={{
                color: 'var(--color-sand)',
                border: '1px solid rgba(209,204,191,0.3)',
                padding: 'clamp(0.75rem, 1vw, 1rem) clamp(1.5rem, 2vw, 2rem)',
                fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                opacity: 0.8,
              }}
            >
              {t('academics.hero.viewSyllabus')}
            </button>
          </div>
        </motion.div>

        {/* Floating card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="mt-12 glass-panel p-6 max-w-sm flex items-center gap-5"
        >
          <div
            className="w-12 h-12 shrink-0 flex items-center justify-center"
            style={{ border: '1px solid rgba(209,204,191,0.2)' }}
          >
            <span className="material-symbols-outlined text-accent" style={{ fontSize: 20 }}>psychology</span>
          </div>
          <div>
            <p className="font-light text-sand text-sm mb-1">{t('academics.hero.cardTitle')}</p>
            <p className="font-light text-sm" style={{ color: 'rgba(209,204,191,0.5)' }}>{t('academics.hero.cardBody')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
