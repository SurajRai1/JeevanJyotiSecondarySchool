'use client';

/**
 * @file AdmissionsHero.tsx
 * @description Elementis-style hero for Admissions — full-bleed image,
 * bottom-aligned editorial typography, and floating key dates card.
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function AdmissionsHero() {
  const { t } = useT();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '90svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover object-top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDulEVVn2fw8BqHXQX-O-chhYdun1ch11yvmzR3DEOLsNLAxY7cd37cJc_pbOxSdBxkrVhWeRVUoDHtz5qpWiSoTZ5pbrYEFIkyiXw8AIrCEo3ksVijS1nweeyUE7NuXQdofxIZKcqYyoIdSPEkmjOF37hs2k7uFwF1h9yVbSQN6ijKOv4V8mcU4dyW7GbvhhwrHQqrteR4DqmWfa3IohmmOWP9WOZFSG18fyps4huVElu-sFwzaPbBg"
          alt="Modern educational campus setting"
          fill
          priority
          sizes="100vw"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,30,0.6) 0%, rgba(10,15,30,0.3) 40%, rgba(10,15,30,0.92) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned */}
      <div
        className="container-page relative z-10 flex flex-col justify-end"
        style={{
          minHeight: '90svh',
          paddingBottom: 'clamp(3rem, 6vw, 6rem)',
          paddingTop: 'clamp(8rem, 12vw, 10rem)',
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
            {t('admissions.hero.badge')}
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
          {t('admissions.hero.headline1')}{' '}
          <em className="not-italic" style={{ fontWeight: 200, opacity: 0.8, color: 'var(--color-accent)' }}>
            {t('admissions.hero.headline2')}
          </em>
        </motion.h1>

        {/* Main Grid: Left Body & CTAs | Right Key Dates Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-8" style={{ borderTop: '1px solid rgba(209,204,191,0.15)' }}>
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <p
              className="font-light leading-relaxed max-w-xl text-sand/80"
              style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
            >
              {t('admissions.hero.body')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#process"
                className="inline-flex items-center gap-3 font-light transition-all hover:opacity-90"
                style={{
                  color: 'var(--color-bg)',
                  backgroundColor: 'var(--color-sand)',
                  padding: 'clamp(0.75rem, 1vw, 0.95rem) clamp(1.5rem, 2vw, 2rem)',
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  fontWeight: 500,
                }}
              >
                {t('admissions.hero.startApplication')}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 font-light transition-all hover:opacity-100"
                style={{
                  color: 'var(--color-sand)',
                  border: '1px solid rgba(209,204,191,0.3)',
                  padding: 'clamp(0.75rem, 1vw, 0.95rem) clamp(1.5rem, 2vw, 2rem)',
                  fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                  opacity: 0.85,
                }}
              >
                {t('admissions.hero.downloadProspectus')}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1V8M6 8L3 5M6 8L9 5M1 11H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Sleek Key Dates Architectural Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
            className="lg:col-span-6"
          >
            <div
              className="p-6 md:p-8 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(209, 204, 191, 0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(209, 204, 191, 0.1)' }}>
                <span className="text-xs uppercase tracking-[0.15em] text-accent font-light">
                  {t('admissions.hero.keyDates')}
                </span>
                <span className="material-symbols-outlined text-sand/40" style={{ fontSize: 18 }}>
                  event_upcoming
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-sand/50 mb-1">Phase 01</p>
                  <p className="text-sm font-medium text-sand">{t('admissions.hero.date1Label')}</p>
                  <p className="text-xs text-accent mt-1 font-light">{t('admissions.hero.date1Value')}</p>
                </div>

                <div style={{ borderLeft: '1px solid rgba(209, 204, 191, 0.1)' }} className="md:pl-5">
                  <p className="text-[10px] uppercase tracking-wider text-sand/50 mb-1">Phase 02</p>
                  <p className="text-sm font-medium text-sand">{t('admissions.hero.date2Label')}</p>
                  <p className="text-xs text-accent mt-1 font-light">{t('admissions.hero.date2Value')}</p>
                </div>

                <div style={{ borderLeft: '1px solid rgba(209, 204, 191, 0.1)' }} className="md:pl-5">
                  <p className="text-[10px] uppercase tracking-wider text-sand/50 mb-1">Phase 03</p>
                  <p className="text-sm font-medium text-sand">{t('admissions.hero.date3Label')}</p>
                  <p className="text-xs text-accent mt-1 font-light">{t('admissions.hero.date3Value')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
