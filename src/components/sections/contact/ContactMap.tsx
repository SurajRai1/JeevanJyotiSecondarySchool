'use client';

/**
 * @file ContactMap.tsx
 * @description Embedded map section with Elementis-style dark theme integration,
 * hairline borders, and floating glass-panel location card.
 */

import { motion } from 'framer-motion';
import { SITE } from '@/lib/constants';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function ContactMap() {
  const { t } = useT();

  return (
    <section
      className="w-full relative py-16 md:py-24"
      style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-8 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                Location
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              {t('contact.map.headline')}
            </h2>
          </div>
          <p className="text-sand/70 font-light text-sm max-w-md">
            {t('contact.map.subtitle')}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: EASE }}
        className="w-full h-[400px] md:h-[580px] relative grayscale-[40%] contrast-[1.1]"
        style={{ borderTop: '1px solid rgba(209, 204, 191, 0.12)', borderBottom: '1px solid rgba(209, 204, 191, 0.12)' }}
      >
        <iframe
          className="w-full h-full opacity-85"
          src="https://maps.google.com/maps?q=Jeevan+Jyoti+Secondary+School+Sunsari&t=&z=14&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          title="Google Map"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(10, 15, 30, 0.25)', mixBlendMode: 'multiply' }}
        />

        {/* Map Overlay Card — architectural floating panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="absolute bottom-6 left-5 right-5 md:left-auto md:right-16 md:bottom-12 md:w-88 p-6 md:p-8 backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(10, 15, 30, 0.92)',
            border: '1px solid rgba(209, 204, 191, 0.2)',
          }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{
                border: '1px solid rgba(209, 204, 191, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>
                apartment
              </span>
            </div>
            <div>
              <h4 className="text-sand text-base font-medium mb-1">
                {t('contact.map.cardTitle')}
              </h4>
              <p className="text-sand/70 text-xs font-light leading-relaxed">
                {SITE.address}
              </p>
            </div>
          </div>

          <a
            href={SITE.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full font-light transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-sand)',
              color: 'var(--color-bg)',
              padding: '0.75rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <span>{t('contact.map.getDirections')}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
