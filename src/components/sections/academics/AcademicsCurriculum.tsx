'use client';

/**
 * @file AcademicsCurriculum.tsx
 * @description Elementis-style academic pathways and curriculum explorer
 * with architectural tabs, bento subject previews, and stream accordions.
 */

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/hooks/useT';

const EASE: [number, number, number, number] = [0.24, 0.43, 0.15, 0.97];

export function AcademicsCurriculum() {
  const { t, tArr } = useT();
  const [activeTab, setActiveTab] = useState<'primary' | 'middle' | 'senior'>('primary');
  const [openStream, setOpenStream] = useState<string | null>('commerce');

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.35, ease: EASE } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      className="py-24 md:py-36 relative"
      style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid rgba(209, 204, 191, 0.1)' }}
    >
      <div className="container-page">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block h-px w-8 md:w-12 bg-accent" />
            <span className="text-accent text-[10px] md:text-xs font-light tracking-[0.2em] uppercase">
              Curriculum Architecture
            </span>
            <span className="block h-px w-8 md:w-12 bg-accent" />
          </div>
          <h2
            className="text-sand font-light leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            {t('academics.curriculum.headline')}
          </h2>
          <p
            className="text-sand/70 font-light max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)' }}
          >
            {t('academics.curriculum.subtitle')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-start md:justify-center gap-3 mb-16 overflow-x-auto pb-4 hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {[
            { id: 'primary', label: t('academics.curriculum.tabPrimary') },
            { id: 'middle', label: t('academics.curriculum.tabMiddle') },
            { id: 'senior', label: t('academics.curriculum.tabSenior') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'primary' | 'middle' | 'senior')}
              className="px-6 py-3 text-xs uppercase tracking-widest transition-all whitespace-nowrap shrink-0 font-light"
              style={{
                border: activeTab === tab.id ? '1px solid var(--color-sand)' : '1px solid rgba(209, 204, 191, 0.15)',
                backgroundColor: activeTab === tab.id ? 'var(--color-sand)' : 'rgba(255, 255, 255, 0.02)',
                color: activeTab === tab.id ? 'var(--color-bg)' : 'var(--color-sand)',
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Container */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'primary' && (
              <motion.div
                key="primary"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
                  <motion.div variants={itemVariants}>
                    <h3
                      className="text-sand font-light mb-4 leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}
                    >
                      {t('academics.curriculum.primaryTitle')}
                    </h3>
                    <p className="text-sand/75 leading-relaxed font-light text-sm">
                      {t('academics.curriculum.primaryBody')}
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    {(() => {
                      const subjects = tArr<string>('academics.curriculum.primarySubjects');
                      const defaults = [
                        'Language Arts',
                        'Mathematics',
                        'Environmental Sci.',
                        'Creative Arts',
                      ];
                      return [
                        { icon: 'language', title: subjects[0] || defaults[0] },
                        { icon: 'calculate', title: subjects[1] || defaults[1] },
                        { icon: 'eco', title: subjects[2] || defaults[2] },
                        { icon: 'palette', title: subjects[3] || defaults[3] },
                      ].map((subject, idx) => (
                        <div
                          key={idx}
                          className="p-5 transition-colors hover:bg-white/5"
                          style={{
                            border: '1px solid rgba(209, 204, 191, 0.12)',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          }}
                        >
                          <span
                            className="material-symbols-outlined text-accent mb-2 block"
                            style={{ fontSize: 20 }}
                          >
                            {subject.icon}
                          </span>
                          <h4 className="text-sand font-medium text-sm">{subject.title}</h4>
                        </div>
                      ));
                    })()}
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="lg:col-span-7 order-1 lg:order-2">
                  <div
                    className="relative h-[360px] md:h-[480px] overflow-hidden group"
                    style={{ border: '1px solid rgba(209, 204, 191, 0.15)' }}
                  >
                    <Image
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIqXcWzX0A6PkIrbrD7Tn5n8-X3lJy66a4PhLoh2by_51jiPaq9ErxbSSzwBNd3tDiSudSEC4KS7LFQfeaZhRTWSSjj60ILeS1ciwMx4vKbclGKMdj8AZXtAhaQ4nYe9ufaoOJEkUaDi0v0y-PmdauGIDZ0KY5Caqu4uDxI-tBmDvzK8Zzua5AxxcV9WfDeQhn0plNFlWfF4XmDR1Ja8FCjy47tYajGYeeH-y045HaNfxisO8ymiHbdA"
                      alt="Primary students engaging in experiential learning"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'rgba(10, 15, 30, 0.25)' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'middle' && (
              <motion.div
                key="middle"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <motion.div variants={itemVariants} className="lg:col-span-7">
                  <div
                    className="relative h-[360px] md:h-[480px] overflow-hidden group"
                    style={{ border: '1px solid rgba(209, 204, 191, 0.15)' }}
                  >
                    <Image
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsL9yglUM6hZqQZrNAcG8e1SujQ85gC9X7ByINep6ZHKGMoP9F65valv6VqsbRTYzm3SPYfr6DNXuQJROdg6OElwDXgqm-a6KTLaSoYuapzqqD2K-Ik2sP1lUrlviyRt14v1JoN0UcaTQBInq9dkTAzUiOiM4ETCFY48yK8qBSooQc3WRgntder3p1oh99ACBDSkepIJ_evNn_58A0B8VLK-0VASNK7tRRLk1dpau8jLe_NQ-h3_HTw"
                      alt="Middle school students in interactive laboratory"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'rgba(10, 15, 30, 0.25)' }}
                    />
                  </div>
                </motion.div>

                <div className="lg:col-span-5 space-y-8">
                  <motion.div variants={itemVariants}>
                    <h3
                      className="text-sand font-light mb-4 leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}
                    >
                      {t('academics.curriculum.middleTitle')}
                    </h3>
                    <p className="text-sand/75 leading-relaxed font-light text-sm">
                      {t('academics.curriculum.middleBody')}
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-4">
                    <div
                      className="flex items-start gap-4 p-5 transition-colors hover:bg-white/5"
                      style={{
                        border: '1px solid rgba(209, 204, 191, 0.12)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <div
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{
                          border: '1px solid rgba(209, 204, 191, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>
                          school
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sand font-medium text-sm">
                          {t('academics.curriculum.middleSubject1Title')}
                        </h4>
                        <p className="text-xs text-sand/65 mt-1 font-light leading-relaxed">
                          {t('academics.curriculum.middleSubject1Body')}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-start gap-4 p-5 transition-colors hover:bg-white/5"
                      style={{
                        border: '1px solid rgba(209, 204, 191, 0.12)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <div
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{
                          border: '1px solid rgba(209, 204, 191, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <span className="material-symbols-outlined text-accent" style={{ fontSize: 18 }}>
                          menu_book
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sand font-medium text-sm">
                          {t('academics.curriculum.middleSubject2Title')}
                        </h4>
                        <p className="text-xs text-sand/65 mt-1 font-light leading-relaxed">
                          {t('academics.curriculum.middleSubject2Body')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'senior' && (
              <motion.div
                key="senior"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
                  <motion.div variants={itemVariants}>
                    <h3
                      className="text-sand font-light mb-4 leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}
                    >
                      {t('academics.curriculum.seniorTitle')}
                    </h3>
                    <p className="text-sand/75 leading-relaxed font-light text-sm">
                      {t('academics.curriculum.seniorBody')}
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    {/* Education Stream */}
                    <div
                      style={{
                        border: '1px solid rgba(209, 204, 191, 0.12)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <button
                        onClick={() => setOpenStream(openStream === 'education' ? null : 'education')}
                        className="w-full p-4 text-sand font-medium flex justify-between items-center text-left text-sm hover:bg-white/5 transition-colors"
                      >
                        <span>{t('academics.curriculum.educationStream')}</span>
                        <span
                          className={`material-symbols-outlined text-sand/50 transition-transform duration-300 ${openStream === 'education' ? 'rotate-180' : ''}`}
                          style={{ fontSize: 18 }}
                        >
                          expand_more
                        </span>
                      </button>
                      {openStream === 'education' && (
                        <div
                          className="p-5 text-sm text-sand/70 font-light leading-relaxed"
                          style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                        >
                          {t('academics.curriculum.educationBody')}
                        </div>
                      )}
                    </div>

                    {/* Commerce Stream */}
                    <div
                      style={{
                        border: '1px solid rgba(209, 204, 191, 0.12)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <button
                        onClick={() => setOpenStream(openStream === 'commerce' ? null : 'commerce')}
                        className="w-full p-4 text-sand font-medium flex justify-between items-center text-left text-sm hover:bg-white/5 transition-colors"
                      >
                        <span>{t('academics.curriculum.commerceStream')}</span>
                        <span
                          className={`material-symbols-outlined text-sand/50 transition-transform duration-300 ${openStream === 'commerce' ? 'rotate-180' : ''}`}
                          style={{ fontSize: 18 }}
                        >
                          expand_more
                        </span>
                      </button>
                      {openStream === 'commerce' && (
                        <div
                          className="p-5 text-sm text-sand/70 font-light leading-relaxed"
                          style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                        >
                          {t('academics.curriculum.commerceBody')}
                        </div>
                      )}
                    </div>

                    {/* Humanities Stream */}
                    <div
                      style={{
                        border: '1px solid rgba(209, 204, 191, 0.12)',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <button
                        onClick={() => setOpenStream(openStream === 'humanities' ? null : 'humanities')}
                        className="w-full p-4 text-sand font-medium flex justify-between items-center text-left text-sm hover:bg-white/5 transition-colors"
                      >
                        <span>{t('academics.curriculum.humanitiesStream')}</span>
                        <span
                          className={`material-symbols-outlined text-sand/50 transition-transform duration-300 ${openStream === 'humanities' ? 'rotate-180' : ''}`}
                          style={{ fontSize: 18 }}
                        >
                          expand_more
                        </span>
                      </button>
                      {openStream === 'humanities' && (
                        <div
                          className="p-5 text-sm text-sand/70 font-light leading-relaxed"
                          style={{ borderTop: '1px solid rgba(209, 204, 191, 0.08)' }}
                        >
                          {t('academics.curriculum.humanitiesBody')}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="lg:col-span-7 order-1 lg:order-2">
                  <div
                    className="relative h-[360px] md:h-[480px] overflow-hidden group"
                    style={{ border: '1px solid rgba(209, 204, 191, 0.15)' }}
                  >
                    <Image
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxUIGaR46tcQzcYGXQf_lXFGXwUjYi-gvpdgbLKYXhCVM2PEgEXyDmH37owZ4ZK9Yli3myOH725yVGUWiz88N-ht83SBTt7udtyk-eZLVaGuk8g-nmwsOaQme7hGDwlBKP-fqZDj7B4CCk3vF80CZEGpH7CeX4fjWlRBy0gDt2cgczDopBfI4tKF3LhHFVY-AzBFo-xGs5yrZHP7dxjTajX-FciWl70VDGGfTsuANbV1lZcHvdQLGcSA"
                      alt="Senior secondary students in academic seminar"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'rgba(10, 15, 30, 0.25)' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
