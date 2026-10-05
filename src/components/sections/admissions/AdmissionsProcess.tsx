'use client';

/**
 * @file AdmissionsProcess.tsx
 * @description Elementis-style 4-step admissions sequence with clean architectural
 * cards, numbered headers, hairline rules, and smooth hover micro-interactions.
 */

import { motion } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function AdmissionsProcess() {
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

  const STEPS = [
    {
      num: '01',
      title: t('admissions.process.step1Title'),
      body: t('admissions.process.step1Body'),
      icon: 'contact_page',
    },
    {
      num: '02',
      title: t('admissions.process.step2Title'),
      body: t('admissions.process.step2Body'),
      icon: 'upload_file',
    },
    {
      num: '03',
      title: t('admissions.process.step3Title'),
      body: t('admissions.process.step3Body'),
      icon: 'psychology_alt',
    },
    {
      num: '04',
      title: t('admissions.process.step4Title'),
      body: t('admissions.process.step4Body'),
      icon: 'verified',
    },
  ];

  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      id="process"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-8 md:w-12 bg-accent" />
              <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
                Admissions Journey
              </span>
            </div>
            <h2
              className="text-sand font-light leading-none tracking-tight max-w-2xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              {t('admissions.process.headline')}
            </h2>
          </div>
          <p
            className="text-sand/70 font-light leading-relaxed max-w-md"
            style={{ fontSize: 'clamp(0.875rem, 1vw, 1.05rem)' }}
          >
            {t('admissions.process.subtitle')}
          </p>
        </motion.div>

        {/* Step Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              className="group relative flex flex-col justify-between p-8 transition-all duration-500"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(209, 204, 191, 0.12)',
                minHeight: '280px',
              }}
            >
              {/* Subtle top accent bar on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />

              {/* Step Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-light tracking-tight text-accent"
                    style={{ fontSize: 'clamp(1.5rem, 2vw, 2.2rem)' }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="material-symbols-outlined text-sand/30 group-hover:text-sand/70 transition-colors"
                    style={{ fontSize: 24 }}
                  >
                    {step.icon}
                  </span>
                </div>

                <h3
                  className="text-sand font-normal mb-3 leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)' }}
                >
                  {step.title}
                </h3>
              </div>

              {/* Step Description */}
              <p
                className="text-sand/65 font-light leading-relaxed text-sm"
                style={{ borderTop: '1px solid rgba(209,204,191,0.08)', paddingTop: '1rem' }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
