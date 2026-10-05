'use client';

/**
 * @file StudentLifeHero.tsx
 * @description Elementis-style hero for Student Life — full-bleed image,
 * bottom-aligned typography, hairline rules, and editorial caption.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function StudentLifeHero() {
  const { t } = useT();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '85svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT8-5jwnHiZJBEEy3689apswOksoRsEJcdm3NASTK3ySE0jvcWsavblNI9LjtOW6YRvMOfrcHU-KB0jyG_DMQsGmOZarBwwxlQLscoBHvv6-MYHKDSXsw6ukWAHFZz6dCRL-ojOozRJN-nseqfT0BxA3Nqu9T5xtw8WXCDAfaCK0oju0KoK0QGoz2vlldm_QcczcugjKlWihZlWwVdoj11WTFRlJbmsMHTqRt-4oLZSAO0WDMAXhkHuQ"
          alt="High school students engaged in an energetic drama rehearsal"
          fill
          priority
          sizes="100vw"
          style={{ opacity: 0.32 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,30,0.6) 0%, rgba(10,15,30,0.3) 40%, rgba(10,15,30,0.9) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned */}
      <div
        className="container-page relative z-10 flex flex-col justify-end"
        style={{
          minHeight: '85svh',
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
            Campus Experience
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="text-white font-light leading-none tracking-tight max-w-4xl mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
        >
          {t('studentLife.hero.headline1')}{' '}
          <em className="not-italic text-accent" style={{ fontWeight: 200 }}>
            {t('studentLife.hero.headline2')}
          </em>
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8"
          style={{ borderTop: '1px solid rgba(209,204,191,0.15)' }}
        >
          <p
            className="font-light leading-relaxed max-w-xl text-sand/80"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
          >
            {t('studentLife.hero.body')}
          </p>

          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="#activities"
              className="inline-flex items-center gap-3 font-light transition-all hover:opacity-90"
              style={{
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-sand)',
                padding: 'clamp(0.75rem, 1vw, 0.95rem) clamp(1.5rem, 2vw, 2rem)',
                fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                fontWeight: 500,
              }}
            >
              {t('studentLife.hero.exploreActivities')}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
