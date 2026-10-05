'use client';

/**
 * @file ContactHero.tsx
 * @description Elementis-style editorial hero for Contact page.
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ContactHero() {
  const { t } = useT();

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '65svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw"
          alt="Jeevan Jyoti Campus Entrance"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.22 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,15,30,0.7) 0%, rgba(10,15,30,0.4) 40%, rgba(10,15,30,0.95) 100%)',
          }}
        />
      </div>

      {/* Content — bottom aligned */}
      <div
        className="container-page relative z-10 flex flex-col justify-end"
        style={{
          minHeight: '65svh',
          paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          paddingTop: 'clamp(7.5rem, 11vw, 9rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="block h-px w-8 md:w-12 bg-accent" />
          <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
            {t('contact.hero.label')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="text-white font-light leading-none tracking-tight max-w-4xl mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          {t('contact.hero.headline1')}{' '}
          <em className="not-italic text-accent" style={{ fontWeight: 200 }}>
            {t('contact.hero.headline2')}
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="text-sand/75 font-light leading-relaxed max-w-2xl"
          style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.15rem)' }}
        >
          {t('contact.hero.body')}
        </motion.p>
      </div>
    </section>
  );
}
