'use client';

/**
 * @file BrowseDepartments.tsx
 * @description Elementis-style bento grid for academic departments and institutional resources.
 */

import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function BrowseDepartments() {
  const { t } = useT();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="block h-px w-8 md:w-12 bg-accent" />
          <h2
            className="text-sand font-light leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            {t('resources.departments.headline')}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
        >
          {/* Card 1: Large (2 cols on md) */}
          <motion.a
            variants={itemVariants}
            href="#mathematics"
            className="md:col-span-2 relative group overflow-hidden transition-all duration-500"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-1000"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmsQhbVw6QZe8FuLSsA8FpvpgOn-Oikzlwkvrd9KIg40Kj-oqsqWMK9NcmB31HPqQBk18MSZD45-2T74RUGoUTyguYWT8b9KUgDqAXfNi9ZFnoNw57NQ904XCXQDjUZFPk24rQaxP77YrSQVixg9OGZ9bBUNu6_2T1Ys-LMr4iA6Yf7ZxasvmP6tBMyRM1Mh_l-WwecDo7M00QujH0KycpbXHlmDmEnHWnxrIQm7wWtbNTU1tuWKTicA')",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,15,30,0.2) 0%, rgba(10,15,30,0.7) 50%, rgba(10,15,30,0.95) 100%)',
              }}
            />

            {/* Accent top hover bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            <div className="relative h-full p-8 flex flex-col justify-end">
              <div
                className="w-10 h-10 flex items-center justify-center text-accent mb-4 shrink-0"
                style={{
                  border: '1px solid rgba(209, 204, 191, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <h3 className="text-2xl font-light text-sand mb-2">
                {t('resources.departments.dept1Title')}
              </h3>
              <p className="text-sand/70 text-sm font-light mb-4 max-w-md">
                {t('resources.departments.dept1Body')}
              </p>
              <span className="text-accent text-xs uppercase tracking-widest font-light flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('resources.departments.dept1Cta')}
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </span>
            </div>
          </motion.a>

          {/* Card 2: Education */}
          <motion.a
            variants={itemVariants}
            href="#education"
            className="relative group overflow-hidden transition-all duration-500 p-8 flex flex-col justify-between"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            <div
              className="w-10 h-10 flex items-center justify-center text-accent shrink-0"
              style={{
                border: '1px solid rgba(209, 204, 191, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <span className="material-symbols-outlined text-[20px]">biotech</span>
            </div>

            <div>
              <h3 className="text-xl font-light text-sand mb-2">
                {t('resources.departments.dept2Title')}
              </h3>
              <p className="text-sand/70 text-sm font-light mb-4 line-clamp-2">
                {t('resources.departments.dept2Body')}
              </p>
              <span className="text-accent text-xs uppercase tracking-widest font-light flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('resources.departments.dept2Cta')}
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </span>
            </div>
          </motion.a>

          {/* Card 3: Humanities */}
          <motion.a
            variants={itemVariants}
            href="#humanities"
            className="relative group overflow-hidden transition-all duration-500 p-8 flex flex-col justify-between"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.15)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            <div
              className="w-10 h-10 flex items-center justify-center text-accent shrink-0"
              style={{
                border: '1px solid rgba(209, 204, 191, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>

            <div>
              <h3 className="text-xl font-light text-sand mb-2">
                {t('resources.departments.dept3Title')}
              </h3>
              <p className="text-sand/70 text-sm font-light mb-4 line-clamp-2">
                {t('resources.departments.dept3Body')}
              </p>
              <span className="text-accent text-xs uppercase tracking-widest font-light flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('resources.departments.dept3Cta')}
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </span>
            </div>
          </motion.a>

          {/* Promotional Card: spans 2 cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden"
            style={{
              border: '1px solid rgba(209, 204, 191, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            }}
          >
            <div className="relative z-10 flex-1">
              <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-light mb-2 block">
                {t('resources.departments.promoBadge')}
              </span>
              <h3
                className="text-sand font-light leading-snug mb-2"
                style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)' }}
              >
                {t('resources.departments.promoTitle')}
              </h3>
              <p className="text-sand/70 text-sm font-light max-w-lg leading-relaxed">
                {t('resources.departments.promoBody')}
              </p>
            </div>

            <a
              href="/auth/login"
              className="inline-flex items-center gap-3 font-light transition-all hover:opacity-90 shrink-0"
              style={{
                backgroundColor: 'var(--color-sand)',
                color: 'var(--color-bg)',
                padding: '0.75rem 1.5rem',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              <span>{t('resources.departments.promoCta')}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
